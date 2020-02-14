import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import axios from 'axios';

export default function Book() {

    const [bookData, setBookData] = useState({});
    let {isbn} = useParams();

    // useEffect(() => {
    //     const getData = async () => {
    //       const result = await axios.get(
    //         `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
    //       );
    //       console.log('inside getData', result.data.meals[0]);
    //       setApiData(result.data.meals[0]);
    //     }
    //     getData();
    //   }, [id]);

    useEffect(() => {
        const getData = async () => {
          const result = await axios.get(
            `https://openlibrary.org/api/books?bibkeys=ISBN:${isbn}&jscmd=details&format=json`
          );

        //   const details = [Object.values(result.data)[0].details]
        //   console.log(details)
        //   setBookData(details)

        // let output = Object.keys(result.data).map(function(item) {
        //     return result.data[item]
        //   })
        //   setBookData(output)

            console.log(result.data)
        }
        getData();
      }, [isbn]);

    return (
        <React.Fragment>
            <p>hi</p>
        </React.Fragment>
    )
}