import colors from "vuetify/es5/util/colors";

type Color = string;
type ColorList = [Color, Color, Color];

class FlagCreator {
  static COLORLIST = {
    White: colors.shades.white,
    Black: colors.shades.black,
    Green: colors.green.base,
    Red: colors.red.base,
    Blue: colors.blue.base,
    Yellow: colors.yellow.base,
    Orange: colors.orange.base
  };

  static getColor(): ColorList {
    const color: Color = colors.shades.white;

    // let list: ColorList = [color, color, color];
    return [color, color, color];
  }
  static calcSequence(): Array<number> {
    return [];
  }
}

export default FlagCreator;
