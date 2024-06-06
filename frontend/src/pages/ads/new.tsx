import { BACKEND_URL } from "@/constants";
import axios from "axios";
import React, { useEffect, useState } from "react";

interface AdCategory {
    id: number;
    name: string;
}

export default function CreateAdPage() {

    const [categories, setCategories] = useState<AdCategory[]>([]);

    async function fetchCategories() {
        const { data } = await axios.get<AdCategory[]>(BACKEND_URL + '/categories');
        console.log(data);
        setCategories(data);
    }

    useEffect(() => {
        fetchCategories();
    }, []);

    function createAd(event: React.SyntheticEvent) {
        event.preventDefault();
        console.log("événement submit reçu", event);

        const form: HTMLFormElement = event.target as HTMLFormElement;
        const formData = new FormData(form);

        console.log(formData)

        const formValuesObject = Object.fromEntries(formData.entries());

        console.log(formValuesObject)

    }

    return <>
        <h1>Créer une annonce</h1>

        <form onSubmit={createAd}>

            <input type="text" name="title" placeholder="Saisissez un titre pour l'annonce..." />

            <br />Prix :
            <input type="number" name="price" min="1" max="10000" />

            <br />Description :
            <textarea name="description">
            </textarea>

            <br />Catégorie :
            Sélectionnez une des {categories.length} catégories disponibles
            <select name="category">
                {categories.map(category => (
                    <option value={category.id} key={category.id}>
                        {category.name}
                    </option>
                ))}
            </select>

            <br />


            <button type="submit">
                Envoyer
            </button>
        </form>
    </>;
} 