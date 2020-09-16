<template>
    <v-simple-table>
        <template v-slot:default>
            <thead>
            <tr>
                <th class="text-md-center">#</th>
                <th class="text-md-center">Colors</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="item in colorDataModel.colorItems" :key="item.name">
                <td>
                    <v-checkbox v-model="item.checked"/>
                </td>
                <td class="text-md-center"
                    v-bind:style='"background-color:" + item.colorValue + "; color:" + textColor(item.colorValue)'>
                    {{ item.name }}
                </td>
            </tr>
            </tbody>
        </template>
    </v-simple-table>
</template>

<script lang="ts">
    import {Component, Vue} from "vue-property-decorator";
    import {ColorDataModel} from "@/components/colortable/ColorTable";

    @Component
    export default class ColorTable extends Vue {
        public colorDataModel: ColorDataModel = this.init();

        public init(): ColorDataModel {
            return new ColorDataModel();
        }

        public textColor(hexTripletColor: string): string {
            let color = hexTripletColor;
            color = color.substring(1); // remove #
            let colorNumeric = parseInt(color, 16); // convert to integer
            colorNumeric = 0xFFFFFF ^ colorNumeric; // invert three bytes
            color = colorNumeric.toString(16); // convert to hex
            color = ("000000" + color).slice(-6); // pad with leading zeros
            color = "#" + color; // prepend #
            return color;
        }

        mounted() {

            for (const index in this.colorDataModel.colorItems) {
                this.$watch(['colorDataModel.colorItems', index, 'checked'].join('.'), (newVal, oldVal) => {
                    console.info("colorDataModel.colorItems", this.colorDataModel.colorItems[index], newVal, oldVal);
                });
            }
        }

    }
</script>
