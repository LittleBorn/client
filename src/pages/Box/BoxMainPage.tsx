import { IonBadge, IonButton, IonIcon, IonText, useIonLoading, useIonToast } from '@ionic/react';
import { cubeSharp } from 'ionicons/icons';
import { useEffect, useState } from 'react';
import BoxButton from '../../components/BoxButton';
import BoxProgressBar from '../../components/BoxProgressBar';
import Button from '../../components/Button';
import MainTemplate from '../../components/MainTemplate';
import { IPagePros } from '../../interfaces/IPageProps';
import { IShopifyCollection } from '../../interfaces/Shopify/IShopifyCollection';
import { IShopifyProduct } from '../../interfaces/Shopify/IShopifyProduct';
import { basket$ } from '../../stores/basketStore';
import { sendStorefrontQuery } from '../../utils/shopifyStorefrontHelper';
import DefaultBoxItem from './DefaultBoxItem';

const SEGMENTS = [
  {
    id: "Babywindeln",
    title: "Windeln"
  },
  {
    id: "Feuchttücher",
    title: "Tücher"
  },
  {
    id: "Babynahrung",
    title: "Nahrung"
  },
  {
    id: "Fläschchen und Schnuller",
    title: "Zubehör"
  },
  {
    id: "Babypflege",
    title: "Pflege"
  }
];

interface ICollectionResult {
  "data": {
    "collections": {
      "edges": Array<IShopifyCollection>
    }
  }
}

interface ICollectionError {
  "errors": {
    "errors": Array<{
      extensions: any,
      locations: Array<any>,
      message: string,
      path: Array<string>
    }>
  }
}

const BoxMainPage: React.FC<IPagePros> = ({ props }: IPagePros) => {

  const [presentToast, dismissToast] = useIonToast();
  const [presentLoading, dismissLoading] = useIonLoading();

  useEffect(() => {
    // fetch windeln
    segmentChanged(SEGMENTS[0].id)
    // set basket state with observable
    basket$.asObservable().subscribe(v => setBasket(v))
  }, [])

  const [currentSegment, setCurrentSegment] = useState<string>("Babywindeln")
  const [products, setProducts] = useState<Array<IShopifyProduct>>()

  const [basket, setBasket] = useState<string[]>([])

  const segmentChanged = async (currentSegment: string | undefined, cursorAfter?: string | undefined, cursorBefore?: string | undefined) => {

    if (typeof currentSegment === "undefined") return;

    presentLoading(undefined, 1000)

    // change current segment for view
    setCurrentSegment(currentSegment)

    var filter = "";

    if (cursorAfter) {
      filter = `first: 50, after: "${cursorAfter}"`;
    } else if (cursorBefore) {
      filter = `last: 50, before: "${cursorBefore}"`;
    } else {
      filter = `first: 50`;
    }

    let data = JSON.stringify({
      query: `query {
        collections(first: 1, query: "title:${currentSegment}") {
          edges {
            node {
              id
              title
              products(${filter}){
                edges{
                  cursor
                  node{
                      availableForSale
                      description
                      handle
                      variants (first: 20){
                        edges{
                          node{
                              id
                              title
                              compareAtPriceV2{
                                  amount
                                  currencyCode
                              }
                              barcode
                              availableForSale
                              currentlyNotInStock
                              image{
                                  altText
                                  height
                                  id
                                  url
                                  width
                              }
                              priceV2{
                                  amount
                                  currencyCode
                              }
                              requiresShipping
                              weight
                          }
                      }
                      }
                      compareAtPriceRange {
                          maxVariantPrice{
                              amount
                              currencyCode
                          }
                          minVariantPrice{
                              amount
                              currencyCode
                          }
                      }
                      createdAt
                      title
                      id
                      options {
                          id
                          name
                          values
                      }
                      featuredImage {
                          id
                          url
                          altText
                          height
                      }
                      onlineStoreUrl
                      requiresSellingPlan
                      seo {
                          description
                          title
                      }
                      tags
                      totalInventory
                      vendor
                  }
              }
              }
            }
          }
        }
      }`,
      variables: {}
    })

    const collectionResult = await sendStorefrontQuery<ICollectionResult>(data);
    if (typeof collectionResult?.data === "undefined") {
      // error fetching items
      dismissLoading()
      presentToast("Error occured while fetching Products", 2000)
    } else {
      if (collectionResult.data.collections.edges.length > 0) {
        const COLLECTION = collectionResult.data.collections.edges[0];
        const PRODUCTS = COLLECTION.node.products.edges;
        // todo hier kann durch before/after pointer die Richtung festgestellt werden
        if (PRODUCTS.length === 0) {
          presentToast("Keine weiteren Produkte gefunden", 2000)
        } else {
          setProducts(PRODUCTS)
        }
        dismissLoading();
      } else {
        // or the segment was not found
        dismissLoading();
        presentToast("Segment was not found", 2000)
      }
    }
  }


  return (
    <MainTemplate title='Deine Box 🎁'>
      <div style={{ display: "flex", flexDirection: "column", height: "100vh", padding: "1rem", gap: "0.5rem" }}>

        <BoxProgressBar style={{ margin: "0.5rem 0rem 0.5rem 0rem" }} progress={
          SEGMENTS.map(SEGMENT => {
            if (currentSegment === SEGMENT.id) {
              return {
                color: "#44C1AD",
                title: SEGMENT.title,
                onClick: () => segmentChanged(SEGMENT.id)
              }
            } else {
              return {
                color: "lightgrey",
                title: SEGMENT.title,
                onClick: () => segmentChanged(SEGMENT.id)
              }
            }
          })
        } />

        {/* Title Bar and Basket */}
        <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
          <h4>
            <b>{currentSegment && currentSegment}</b>
          </h4>
          <div>
            {basket && basket.length > 0 &&
              <IonBadge style={{ position: "absolute", marginLeft: "-5px", marginTop: "-5px", "--background": "#666666", zIndex: 2, padding: "4px 9px 4px 9px" }}>{basket.length}</IonBadge>
            }
            <IonButton onClick={() => props.history.push('/BoxOverview')} disabled={!(basket && basket.length > 0)}>
              <IonIcon icon={cubeSharp} />
            </IonButton>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "row", flexWrap: "wrap", gap: "0.5rem", justifyContent: "center" }}>
          {
            products && products?.length > 0 && products?.map(product => {
              return (
                <DefaultBoxItem inBasket={basket.find(basketItem => product.node.variants.edges.find(variant => variant.node.id === basketItem)) !== undefined} key={product.node.id} product={product} />
              );
            })
          }
        </div>
      </div>

      {/* Pagination */}
      {/* <div style={{ display: "flex", gap: "0.5rem", justifyContent: "center" }}>
          <Button title={`<`} onClick={() => {
            if (products && products?.length > 0) {
              segmentChanged(currentSegment, undefined, products[0]?.cursor)
            } else {
              segmentChanged(currentSegment)
            }
          }} />
          <Button title={`>`} onClick={() => {
            if (products && products?.length > 0) {
              segmentChanged(currentSegment, products?.reverse()[0].cursor, undefined)
            } else {
              segmentChanged(currentSegment)
            }
          }} />
        </div> */}

      {/* Weiter / Zurück Buttons */}
      <div style={{ position: "fixed", width: "100%", bottom: "2rem", display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column" }}>
        <BoxButton onClick={() => {
          const currentIndex = SEGMENTS.findIndex(s => s.id === currentSegment);
          if (SEGMENTS[currentIndex + 1] !== undefined) {
            segmentChanged(SEGMENTS[currentIndex + 1].id);
          } else {
            props.history.push('/BoxSuccess');
            // presentToast("Keine weitere Seite gefunden!", 1000)
          }
        }}
          title={SEGMENTS.findIndex(s => s.id === currentSegment) === SEGMENTS.length - 1 ? `Abschließen` : `Weiter`}
          text={basket?.length > 1 ? `${basket.length} Produkte ausgewählt)` : basket?.length === 1 ? `${basket.length} Produkt ausgewählt)` : ``}
          style={{ width: "80%" }} />
        <IonText onClick={() => {
          const currentIndex = SEGMENTS.findIndex(s => s.id === currentSegment);
          if (SEGMENTS[currentIndex - 1] !== undefined) {
            segmentChanged(SEGMENTS[currentIndex - 1].id);
          } else {
            presentToast("Keine vorherige Seite gefunden!", 1000)
          }
        }} style={{ cursor: "pointer" }} color={"primary"}>zurück</IonText>
      </div>

    </MainTemplate>
  );
};

export default BoxMainPage;
