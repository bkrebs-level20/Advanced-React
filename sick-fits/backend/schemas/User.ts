import { text, password, relationship } from '@keystone-next/fields';
import { list } from '@keystone-next/keystone/schema';

export const User = list({
    // access:
    // ui
    fields: {
        // the {} inside of text are options!  use isIndexed if you are searching it a lot.
        name: text({ isRequired: true }),
        email: text({ isRequired: true, isUnique: true }),
        password: password(),
        // TODO: add roles, carts, and orders
    },
});
