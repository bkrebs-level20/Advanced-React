/* eslint-disable @typescript-eslint/indent */
/* eslint-disable prettier/prettier */
import { integer, relationship, select, text } from '@keystone-next/fields';
import { list } from '@keystone-next/keystone/schema';

export const Product = list({
    // TODO
    // access:
    fields: {
        name: text({ isRequired: true }),
        description: text({
            ui: {
                displayMode: 'textarea',
            },
        }),
        photo: relationship({
            ref: 'ProductImage.product',
            ui: {
                displayMode: 'cards',
                cardFields: ['image', 'altText'],
                inlineCreate: { fields: ['image', 'altText'] }, // means we want to create
                inlineEdit: { fields: ['image', 'altText'] }, // means we should be able to edit in the screen.
            }
        }),
        status: select({
            options: [
                { label: 'Draft', value: 'Draft' },
                { label: 'Available', value: 'AVAILABLE' },
                { label: 'Unavailable', value: 'Unavailable' },
            ],
            defaultValue: 'DRAFT',
            ui: {
                displayMode: 'segmented-control',
                createView: { fieldMode: 'hidden' },
            },
        }),
        price: integer(),
        // TODO: Photo via Relationship in Lesson 16
    },
});
