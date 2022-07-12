import { integer, select, text } from '@keystone-next/fields';
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
