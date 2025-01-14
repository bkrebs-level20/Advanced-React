/* eslint-disable @typescript-eslint/indent */
/* eslint-disable prettier/prettier */
import { createAuth } from '@keystone-next/auth';
import { config, createSchema } from '@keystone-next/keystone/schema';
import 'dotenv/config'; // this will import all the environmental variables into the file.
import {
    withItemData,
    statelessSessions,
} from '@keystone-next/keystone/session';
import { User } from './schemas/User';
import { Product } from './schemas/Product';
import { ProductImage } from './schemas/ProductImage';
import { insertSeedData } from './seed-data';


const databaseURL =
    process.env.DATABASE_URL || 'mongodb://localhost/keystone-sick-fits-tutorial';

const sessionConfig = {
    maxAge: 60 * 60 * 24 * 360, // how long should they stay signed in?
    secret: process.env.COOKIE_SECRET,
};

const { withAuth } = createAuth({
    listKey: 'User', // in our case it is a User that logs in and list is objects
    identityField: 'email',
    secretField: 'password',
    initFirstItem: {
        fields: ['name', 'email', 'password'], // does the first time setup.
        // TODO: Add in inital roles here
    },
});

export default withAuth(
    config({
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        server: {
            cors: {
                origin: [process.env.FRONTEND_URL],
                credentials: true,
            },
        },
        db: {
            adapter: 'mongoose',
            url: databaseURL,
            async onConnect(keystone) {
                console.log('Connected to the database');
                if (process.argv.includes('--seed-data')) {
                    await insertSeedData(keystone);
                }
            }
        },
        // data types are called lists.
        lists: createSchema({
            User,
            Product,
            ProductImage,
            // Schema items go in here.
        }),
        // do we want people to be able to use the UI for Keystone?
        ui: {
            // TODO: change this for roles
            // isAccessAllowed: () => true,
            // Now show UI only for people who pass this test...
            isAccessAllowed: ({ session }) => {
                console.log(session);
                // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
                return !!session?.data;
            },
        },
        session: withItemData(statelessSessions(sessionConfig), {
            User: 'id',
        }),
    })
);
