import React from "react";
import { BsCupStraw, BsCart2, BsHandbag, BsShop, BsCameraReels, BsSpeedometer2, BsGeoAlt, BsCalendarCheck, BsTools, BsCreditCard, BsTornado, BsEnvelopeOpen, BsGraphUp, BsDice5, BsMegaphone, BsGift, BsQuestionCircle } from "react-icons/bs";

const categories = [
    'None',
    'Meals',
    'Groceries',
    'Clothing',
    'Products',
    'Entertainment',
    'Mobility',
    'Travel',
    'Events',
    'Services',
    'Bills',
    'Accident',
    'Salary',
    'Investment',
    'Gambling',
    'Sale',
    'Gift',
]

const icons = [
    <BsQuestionCircle/>,
    <BsCupStraw />,
    <BsCart2 />,
    <BsHandbag />,
    <BsShop />,
    <BsCameraReels />,
    <BsSpeedometer2 />,
    <BsGeoAlt/>,
    <BsCalendarCheck/>,
    <BsTools />,
    <BsCreditCard />,
    <BsTornado />,
    <BsEnvelopeOpen />,
    <BsGraphUp />,
    <BsDice5/>,
    <BsMegaphone />,
    <BsGift />
]

export default class CategoryService {

    getAllCategoryNames = () => {
        const categoryNames = categories.map(name => {
            return (
                <option key={name}>{name}</option>
            )
        });
        return categoryNames;
    }

    getCategoryLabel = (id) => {
        return (
            <>{icons[id]}&nbsp;&nbsp;{categories[id]}</>
        )
    }

    getCategoryLabelByName = (name) => {
        return this.getCategoryLabel(categories.indexOf(name))
    }

    getCategoryName = (id) => {
        return categories[id];
    }
}