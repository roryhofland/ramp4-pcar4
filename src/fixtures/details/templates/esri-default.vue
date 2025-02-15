<template>
    <div>
        <div
            class="p-5 pl-3 flex justify-end flex-wrap even:bg-gray-300"
            v-for="(val, name, itemIdx) in itemData()"
            :key="itemIdx"
        >
            <span class="inline font-bold">{{ val.alias }}</span>
            <span class="flex-auto"></span>
            <span
                class="inline"
                v-html="formatValues(val.value, val.alias, val.type)"
            ></span>
        </div>
    </div>
</template>

<script setup lang="ts">
import { inject } from 'vue';
import type { PropType } from 'vue';
import type { FieldDefinition, IdentifyItem } from '@/geo/api';
import linkifyHtml from 'linkify-html';
import type { InstanceAPI } from '@/api';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

const iApi = inject<InstanceAPI>('iApi');

const props = defineProps({
    fields: {
        type: Object as PropType<Array<FieldDefinition>>,
        required: true
    },
    identifyData: {
        type: Object as PropType<IdentifyItem>,
        required: true
    }
});

// clone identifyData and remove unwanted data
const itemData = () => {
    const helper: any = {};
    Object.assign(helper, props.identifyData.data);

    if (!iApi?.ui.exposeOids) {
        // check global oid flag
        delete helper[props.fields.find(f => f.type === 'oid')!.name];
    }
    if (helper.Symbol !== undefined) delete helper.Symbol;

    let aliases: any = {};
    props.fields.forEach(field => {
        aliases[field.name] = {
            name: field.alias || field.name,
            type: field.type
        }; // use the key name if alias is not defined
    });

    Object.keys(helper).map(key => {
        helper[key] = {
            value:
                typeof helper[key] === 'number'
                    ? iApi?.$i18n.n(helper[key], 'number')
                    : helper[key],
            alias: aliases[key].name || key, // use the key name if alias is undefined
            type: aliases[key].type
        };
    });

    return helper;
};

// render value based on type
const formatValues = (html: string, alias: string, type: string): string => {
    switch (type) {
        case 'date':
            return makeDate(html);
        default:
            return makeHtmlLink(html, alias);
    }
};

// make links look like links and work like links
const makeHtmlLink = (html: string, alias: string): string => {
    if (!html) {
        return html;
    }

    // Check to see if url is a valid image / data url based on extension type or format
    if (
        !!html.trim().match(/\.(jpeg|jpg|gif|png)$/) ||
        !!html.trim().match(
            /^\s*data:([a-z]+\/[a-z]+(;[a-z\-]+\=[a-z\-]+)?)?(;base64)?,[a-z0-9\!\$\&\'\,\(\)\*\+\,\;\=\-\.\_\~\:\@\/\?\%\s]*\s*$/i //eslint-disable-line
        )
    ) {
        return `<img src="${html}" alt="${t(
            'details.item.alert.defaultAltText',
            { alias: alias }
        )}" />`;
    }

    const classes = 'underline text-blue-600 break-all';
    const div = document.createElement('div');
    div.innerHTML = html.trim();

    // check if the html string is just an <a> tag
    if (div.firstElementChild?.tagName == 'A') {
        div.firstElementChild.className = classes;
        return div.innerHTML;
    } else {
        // otherwise, look for any valid links
        const options = {
            className: classes,
            target: '_blank',
            validate: {
                url: (value: string) => /^https?:\/\//.test(value) // only links that begin with a protocol will be hyperlinked
            }
        };
        return linkifyHtml(html, options);
    }
};

// convert timestamps into date strings that match the datagrid
const makeDate = (html: string): string => {
    // the value is saved as a string, so attempt to convert it to a number
    const numericDate = parseInt(html);

    // if the date can't be converted to a number, then it may already be formatted. Display it as it is.
    if (isNaN(numericDate)) {
        return html;
    }

    // Return in YYYY-MM-DD format
    const formattedDate = new Date(numericDate);
    return formattedDate.toISOString().split('T')[0];
};
</script>

<style lang="scss"></style>
