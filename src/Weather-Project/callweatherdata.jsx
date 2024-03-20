import React, { useEffect, useState } from "react";
import Loadingcomponent from "./loading";


const url = "https://api.weatherapi.com/v1/current.json?key=8d00d09ab477401b8fb185148241803&q=";


async function GetData(name){
        try{
        const res = await fetch(`${url}${name}&aqi=no`);
        const data = await res.json();
        return data
        }
        catch(error){
            console.error("Error fetching data", error);
        }
        finally{
        }

    return null;

}

export default GetData;