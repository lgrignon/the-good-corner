import { BACKEND_URL } from "@/constants";
import { CreateAdData, adService } from "@/services/AdService";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

interface AdCategory {
    id: number;
    name: string;
}

export interface CreateAdFormData {
    title: string;
    price?: number;
    description?: string;
}

export default function CreateAdPage() {

    const [categories, setCategories] = useState<AdCategory[]>([]);

    const { register, handleSubmit } = useForm<CreateAdFormData>();

    async function fetchCategories() {
        const { data } = await axios.get<AdCategory[]>(BACKEND_URL + '/categories');
        console.log(data);
        setCategories(data);
    }

    useEffect(() => {
        fetchCategories();
    }, []);

    function onFormSubmitted(event: React.SyntheticEvent) {
        event.preventDefault();
        console.log("événement submit reçu", event);

        const form: HTMLFormElement = event.target as HTMLFormElement;
        const formData = new FormData(form);

        console.log(formData)

        const formValuesObject = Object.fromEntries(formData.entries());

        console.log(formValuesObject)

        const createData: CreateAdData = {
            title: formValuesObject.title as string,
            price: parseInt(formValuesObject.price as string),
            owner: 'Louis',
            description: formValuesObject.description as string,
            location: 'Montreuil',
            picture: undefined
        };

        adService.createAd(createData);
    }

    return <>
        <h1>Créer une annonce</h1>

        <form onSubmit={onFormSubmitted}>

            <input type="text" {...register('title', { required: true })} placeholder="Saisissez un titre pour l'annonce..." />

            <br />Prix :
            <input type="number" {...register('price', { valueAsNumber: true, min: 1, max: 10000 })}  />

            <br />Description :
            <textarea {...register('description')}>
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