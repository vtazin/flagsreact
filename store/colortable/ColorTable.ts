import colors from "vuetify/es5/util/colors";

type Color = string;

type ColorItem = {
    name: string;
    checked: boolean;
    colorValue: Color;
}
type ColorList = {
    [key: string]: string;
}

export class ColorDataModel {
    public name = 'ColorDataModel';
    public static COLORLIST: ColorList = {
        'White': colors.shades.white,
        'Black': colors.shades.black,
        'Green': colors.green.base,
        'Red': colors.red.base,
        'Blue': colors.blue.base,
        'Yellow': colors.yellow.base,
        'Orange': colors.orange.base
    };
    private _colorItems: ColorItem[] = [];

    get colorItems(): ColorItem[] {
        return this._colorItems;
    }

    constructor() {
        for (const name in ColorDataModel.COLORLIST) {
            this._colorItems.push({
                name: name,
                checked: true,
                colorValue: ColorDataModel.COLORLIST[name]
            });
        }

        console.log(this.getActiveColors());//todo:

        setTimeout(() => {
            this._colorItems[3].checked = false;//todo:
            console.log(this.getActiveColors());//todo:
        }, 3000)
    }

    public getActiveColors(): ColorItem[] {
        const result: ColorItem[] = [];
        this._colorItems.forEach((value) => {
            if (value.checked) {
                result.push(value);
            }
        });

        return result;
    }
}
