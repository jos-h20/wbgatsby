import { useEffect, useState } from "react";



export default function useLatestData() {
  // Hot Slices
  const [hotSlices, setHotSlices] = useState();
  // slicemasters
  const [slicemasters, setSlicemasters] = useState();

  useEffect(function() {
    // when component loads fetch data
    fetch(process.env.GATSBY_GRAPHQL_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        query: `
query {
  StoreSettings(id: "downtown") {
    name
    slicemaster {
      name
      _id
      image {
        asset {
          url
          metadata {
            lqip
          }
        }
      }
    }
    hotSlices {
      name
      _id
      image {
        asset {
          url 
          metadata { lqip }
        }
      }
    }
  }
}  
        `
      })
    }).then(res => res.json().then(res => {
      // check for errors
      setHotSlices(res.data.StoreSettings.hotSlices);
      setSlicemasters(res.data.StoreSettings.slicemaster)
    }));
  }, []);
  return {
    hotSlices,
    slicemasters,
  }
}