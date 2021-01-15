import {userStore} from "./store/userStore";
import * as Avatar from "bobwai--avatar/src/avatar";
import * as Image from "bobwai--image";
import * as b from "bobril";
import {chatStore} from "./store/chatStore";

export const iconHansBecker = Avatar.create({ colorSeed: "Peter Parker", size: 32 })
export const iconThomasWood = Avatar.create({ colorSeed: "Clint Barton", size: 32 })
export const iconAlenGreen = Avatar.create({ colorSeed: "Natasha Romanoff", size: 32 })
export const iconPhilBarret = Avatar.create({ colorSeed: "Tony Stark", size: 32 });
export const iconJohnMitchel = Image.create({
    src: "https://www.w3schools.com/html/img_girl.jpg",
    fitParent: true,
    centered: true,
    isRounded: true,
    height: 150,
    width: 150
} )

export function findUser(id: number) {
    return userStore.users.find(user => {
        return user.id === id
    });
}

export function generateId(): number {
    return Math.round(Math.random() * new Date().getMilliseconds());
}

export function dateNow(): string {
    var utc = new Date().toJSON().slice(0,10).replace(/-/g,'.');
    return utc;
}

export function icon(id: number) {
    let result;
    result = userStore.users.find(user => {
        return user.id === id
    });
    return result.avatar
}

export function text(text: string | object, fontWeight: string | number, fontSize: number, isItalic: boolean = false, paddingLeft?: number, marginTop?: number, fontFamily?: string) {
    return (
        <span style={{
            fontFamily: fontFamily,
            fontSize: fontSize,
            fontWeight: fontWeight,
            fontStyle: isItalic && "italic",
            paddingLeft: paddingLeft,
            marginTop: marginTop
        }}>{text}</span>
    )
}