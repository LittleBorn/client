import { IonBadge, IonButton, IonFab, IonFabButton, IonIcon, IonImg, IonItem, IonSegment, IonSegmentButton, IonText, IonToolbar, useIonLoading, useIonToast } from '@ionic/react';
import { basketOutline } from 'ionicons/icons';
import { useEffect, useState } from 'react';
import Button from '../../components/Button';
import MainTemplate from '../../components/MainTemplate';
import { IPagePros } from '../../interfaces/IPageProps';
import { sendStorefrontQuery } from '../../utils/shopifyStorefrontHelper';
import DefaultBoxItem from './BoxItems/DefaultBoxItem';

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
  }
];

interface ICollectionResult {
  "data": {
    "collections": {
      "edges": Array<
        {
          "node": {
            "id": string,
            "title": string,
            "products": {
              "edges": Array<{
                cursor: string;
                node: {
                  title: string,
                  id: string,
                  featuredImage: {
                    id: string;
                    url: string;
                    altText: string;
                    height: number;
                  }
                }
              }>
            }
          }
        }>
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
  }, [])

  const [currentSegment, setCurrentSegment] = useState<string>("Babywindeln")
  const [collection, setCollection] = useState<{
    "node": {
      "id": string;
      "title": string;
      "products": {
        "edges": Array<{
          cursor: string;
          node: {
            title: string,
            id: string,
            featuredImage: {
              id: string;
              url: string;
              altText: string;
              height: number;
            }
          }
        }>
      }
    }
  }>()
  const [basket, setBasket] = useState<string[]>()

  const segmentChanged = async (currentSegment: string | undefined, cursorAfter?: string | undefined, cursorBefore?: string | undefined) => {

    if (typeof currentSegment === "undefined") return;

    presentLoading(undefined, 5000)

    // change current segment for view
    setCurrentSegment(currentSegment)


    var data = "";

    if (cursorAfter) {
      data = JSON.stringify({
        query: `query {
        collections(first: 1, query: "title:${currentSegment}") {
          edges {
            node {
              id
              title
              products(first: 6, after: "${cursorAfter}"){
                  edges{
                      cursor
                      node{
                          title
                          id
                          featuredImage {
                              id
                              url
                              altText
                              height
                          }
                      }
                  }
              }
            }
          }
        }
      }`,
        variables: {}
      })
    } else if (cursorBefore) {
      data = JSON.stringify({
        query: `query {
        collections(first: 1, query: "title:${currentSegment}") {
          edges {
            node {
              id
              title
              products(last: 6, before: "${cursorBefore}"){
                  edges{
                      cursor
                      node{
                          title
                          id
                          featuredImage {
                              id
                              url
                              altText
                              height
                          }
                      }
                  }
              }
            }
          }
        }
      }`,
        variables: {}
      })
    } else {
      data = JSON.stringify({
        query: `query {
        collections(first: 1, query: "title:${currentSegment}") {
          edges {
            node {
              id
              title
              products(first: 6){
                  edges{
                      cursor
                      node{
                          title
                          id
                          featuredImage {
                              id
                              url
                              altText
                              height
                          }
                      }
                  }
              }
            }
          }
        }
      }`,
        variables: {}
      })
    }

    const collectionResult = await sendStorefrontQuery<ICollectionResult>(data);
    if (typeof collectionResult?.data === "undefined") {
      // error fetching items
      dismissLoading()
      presentToast("Error occured while fetching Products", 2000)
    } else {
      if (collectionResult.data.collections.edges.length > 0) {
        const COLLECTION = collectionResult.data.collections.edges[0];
        setCollection(COLLECTION)
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


        <IonSegment onIonChange={(e) => segmentChanged(e.detail?.value)} value={currentSegment}>
          {
            SEGMENTS.map(SEGMENT => {
              return <IonSegmentButton key={SEGMENT.id} value={SEGMENT.id}>{SEGMENT.title}</IonSegmentButton>
            })
          }
        </IonSegment>

        <h4>
          <b>{collection && collection.node.title}</b>
        </h4>
        <div style={{ display: "flex", flexDirection: "row", flexWrap: "wrap", gap: "0.5rem", justifyContent: "center" }}>
          {
            collection && collection?.node.products.edges.length > 0 && collection?.node.products.edges.map(product => {
              return (
                <DefaultBoxItem key={product.node.id + "-" + product.node.title} product={product} />
              );
            })
          }
        </div>

        {/* Pagination */}
        <div style={{ display: "flex", gap: "0.5rem", justifyContent: "center"}}>
          <Button title='Previous' onClick={() => {
            if (collection && collection?.node.products.edges.length > 0) {
              segmentChanged(currentSegment, undefined, collection?.node.products.edges[0].cursor)
            } else {
              segmentChanged(currentSegment)
            }
          }} />
          <Button title='Next' onClick={() => {
            if (collection && collection?.node.products.edges.length > 0) {
              segmentChanged(currentSegment, collection?.node.products.edges.reverse()[0].cursor, undefined)
            } else {
              segmentChanged(currentSegment)
            }
          }} />
        </div>


      </div>

      <IonFab vertical="bottom" horizontal="end" slot="fixed" >
        {basket && basket.length > 0 &&
          <IonBadge style={{ position: "absolute", top: "-5px", right: "-5px", "--background": "#666666", zIndex: 2, padding: "4px 9px 4px 9px" }}>{basket.length}</IonBadge>
        }
        <IonFabButton disabled={!(basket && basket.length > 0)}>
          <IonIcon icon={basketOutline} />
        </IonFabButton>
      </IonFab>

    </MainTemplate>
  );
};

export default BoxMainPage;
