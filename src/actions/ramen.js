export const FETCH_RAMEN_REQUEST = 'FETCH_RAMEN_REQUEST';
export const FETCH_RAMEN_SUCCESS = 'FETCH_RAMEN_SUCCESS';
export const FETCH_RAMEN_FAILURE = 'FETCH_RAMEN_FAILURE';

export function fetchRamenData() {
  return dispatch => {
    dispatch({ type: FETCH_RAMEN_REQUEST });

    const query = `
      query {
        friendramengames {
          score
          rating
          anon_name
          recommend
        }
      }
    `;

    fetch('http://localhost:5001/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query }),
    })
      .then(res => res.json())
      .then(result => {
        if (result.data && result.data.friendramengames) {
          dispatch({
            type: FETCH_RAMEN_SUCCESS,
            payload: result.data.friendramengames,
          });
        } else {
          dispatch({
            type: FETCH_RAMEN_FAILURE,
            error: 'Invalid GraphQL response',
          });
        }
      })
      .catch(error =>
        dispatch({
          type: FETCH_RAMEN_FAILURE,
          error,
        })
      );
  };
}