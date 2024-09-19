import React, {useEffect, useState} from 'react';
import Loading from "../Loading.jsx";
import ImageGallery from "./ImageGallery.jsx";
import {useParams} from "react-router-dom";
import FavoriteButton from "./FavoriteButton.jsx";
import Inbox from "../Inbox.jsx";
import MessageInput from "./MessageInput.jsx";
import ChangeButton from "./ChangeButton.jsx";

function PropertyCard() {
    const { id } = useParams();
    const [property, setProperty] = useState(null);
    const [owner, setOwner] = useState(null)
    const propertyId = useParams().id
    useEffect(() => {
        const fetchProperty = async () => {
            try {
                const propertyPromise = await fetch(`http://127.0.0.1:8000/api/property/${id}`)
                const propertyData = await propertyPromise.json();
                await setProperty(propertyData.property);

                const ownerPromise = await fetch(`http://127.0.0.1:8000/api/owner/${propertyData.property['user_id']}`)
                const ownerData = await ownerPromise.json();
                await setOwner(ownerData.user);
                // await console.log(ownerData);

                if (property){
                    const userResponse = await fetch(`http://127.0.0.1:8000/api/owner/${foundData.property['user_id']}`);
                    const user = await userResponse.json();
                    user.user !== null ? setOwner(user.user) : setOwner("N/A");
                }
            } catch (error) {
                console.error('Error fetching property types:', error);
            }

            //TODO handle error when property is not found
        };

        fetchProperty();
    }, []);


    function currencyFormat(num) {
        return '' + num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
    }
    function checkOwnerIsLogIn (){
        const userId = localStorage.getItem('userId')
        if (owner){
            // console.log(owner.id)
            // console.log(userId)
            return owner.id == userId;
        } else {
            return false
        }

    }

    if (!property) {
        return <Loading/>
    } else {
        return (
            <div className={"property-card"}>

                <div className={"grid gap-4 grid-cols-3 grid-rows-3 Property-headline"}>
                    <div className={"row-span-3 col-span-2 property-images apply-square-background"}>
                        <h1>Property images</h1>
                        <ImageGallery/>
                    </div>
                    <div className={"row-span-2 property-quick-data apply-square-background"}>
                        <h1>{property.title}</h1>
                        <h1>Price: {currencyFormat(property.price)} $</h1>
                        <h1>{property.size}m2</h1>
                    </div>
                    <div className={"property-quick-actions apply-square-background"}>
                        <button className={"button"}>Buy</button>
                        {localStorage.getItem('userToken') ? <FavoriteButton property_id={propertyId}/> : ""}
                        {/*<FavoriteButton property_id={propertyId}/>*/}
                        {checkOwnerIsLogIn(owner) ? <ChangeButton/> : "" }

                    </div>
                    {owner ? <MessageInput owner={owner}></MessageInput> : ""}
                    <div className={"col-span-2 property-data apply-square-background"}>
                        <h1>Property data</h1>
                        <table className={"table-auto property-data-table"}>
                            <tbody>
                            <tr>
                                <th>Address</th>
                                <td>{property.city}, {property.street}, {property.house_number}</td>
                            </tr>
                            <tr>
                                <th>Size</th>
                                <td>{property.size} m2</td>
                            </tr>
                            <tr>
                                <th>Rooms</th>
                                <td>{property.rooms}</td>
                            </tr>
                            <tr>
                                <th>Bathrooms</th>
                                <td>{property.bathroom_count}</td>
                            </tr>
                            <tr>
                                <th>Stories</th>
                                <td>{property.floor}</td>
                            </tr>
                            <tr>
                                <th>Build material</th>
                                <td>{property.building_material}</td>
                            </tr>
                            <tr>
                                <th>Type</th>
                                <td>{property.type}</td>
                            </tr>
                            <tr>
                                <th>Plot size</th>
                                <td>{property.plot_size}</td>
                            </tr>
                            <tr>
                                <th>Garages</th>
                                <td>{property.garage}</td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                    {owner ?
                        <div className={"col-span-1 property-owner apply-square-background"}>
                            <h1>Property owner</h1>
                            <h1>{owner['name']}</h1>
                            <h1>{owner['email']}</h1>
                        </div>
                        :
                        <div className={"col-span-1 property-owner apply-square-background"}>
                            <h1>Property owner</h1>
                            <h1>Failed to fetch owner</h1>
                        </div>
                    }
                </div>
            </div>

        );
    }
}

export default PropertyCard;