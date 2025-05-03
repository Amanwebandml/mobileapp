import{Databases,Client, Query} from "react-native-appwrite"


const DATABASE_ID = process.env.EXPO_PUBLIC_APPWRITE_DATEBASE_ID!;
const COLLECTION_ID = process.env.EXPO_PUBLIC_APPWRITE_COLLECTION_ID!;
const client = new Client()
    .setEndpoint('https://cloud.appwrite.io/v1') // Your API Endpoint
    .setProject(process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID!); // Your project ID

const database = new Databases(client);


export const updateSearchCount = async(query:string, movie:Movie)=>{
    const result = await database.listDocuments(DATABASE_ID, COLLECTION_ID,[
        Query.equal('searchTerm', query)
    ])
    console.log(result);
}