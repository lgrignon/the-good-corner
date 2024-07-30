import { BACKEND_URL } from "@/constants";
import { useGetAllCategoryQuery, usePublishAdMutation } from "@/generated/graphql-types";
import { PUBLISH_AD_MUTATION } from "@/graphql-queries/ads";
import { GET_ALL_CATEGORIES_QUERY } from "@/graphql-queries/categories";
import { CreateAdData, adService } from "@/services/AdService";
import { useMutation, useQuery } from "@apollo/client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

interface AdCategory {
    id: string;
    name: string;
}

export interface CreateAdFormData {
    title: string;
    price?: number;
    description?: string;
}

export default function CreateAdPage() {

    const { data: categoriesResult, loading: categoriesLoading, error: categoriesError } = useGetAllCategoryQuery();

    const [publishAd, { loading, data, error }] = usePublishAdMutation();

    const { register, handleSubmit } = useForm<CreateAdFormData>();

    async function onFormSubmitted(formData: CreateAdFormData) {
        console.log('on form submitted', formData);

        await publishAd({
            variables: {
                title: formData.title,
                description: formData.description,
                price: formData.price,
                tags: ['tag1', 'tag2'],
                categoryName: 'Engine mobile'
            }
        });
    }

    if (categoriesLoading) {
        return <p>Loading...</p>;
    }

    if (categoriesError) {
        return <p>Error : {categoriesError.message}</p>;
    }

    if (categoriesResult == null) {
        return <p>No data...</p>;
    }

    console.log("mutation data", loading, data, error);
    const categories: AdCategory[] = categoriesResult.getAllCategories;

    return <>
        <h1>Créer une annonce</h1>

        {data && data.publishAd && (<div>
            L'annonce a bien été créée : {data.publishAd.title} {data.publishAd.createdAt}
        </div>)}

        <form onSubmit={handleSubmit(onFormSubmitted)}>

            <input type="text" {...register('title', { required: true })} placeholder="Saisissez un titre pour l'annonce..." />

            <br />Prix :
            <input type="number" {...register('price', { valueAsNumber: true, min: 1, max: 10000 })} />

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