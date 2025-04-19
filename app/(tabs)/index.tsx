import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import { Link } from "expo-router";
import SearchBar from "@/components/SearchBar";
import { Text, View , Image, ScrollView, ActivityIndicator, FlatList,} from "react-native";
import { useRouter } from "expo-router";
import useFetch from "@/services/useFetch";
import { fetchMovies } from "@/services/api";


export default function Index() {
  const router = useRouter();
  const {
    data: movies, 
    loading: moviesLoading, 
    error: moviesError
  } = useFetch(() => fetchMovies({
    query: ''
  }))
  return (
    <View className="flex-1 bg-primary">
      <Image source={images.bg} className="absolute w-full z-0 "></Image>
      <ScrollView className="flex-1 px-5" showsVerticalScrollIndicator={false} contentContainerStyle={{minHeight: '100%', paddingBottom:10}}>
        <Image source={icons.logo} className="w-12 h-10 mt-20 mb-5 mx-auto"/>
        {moviesLoading ?(
          <
            ActivityIndicator
            size="large"
            color="#0000fff"
            className="mt-20 self-center"
          />
        ):moviesError ? (
          <Text className="text-white text-center mt-20">
            Error: {moviesError?.message}
          </Text>
        ):(
          <View className="flex-1 mt-5">
          <SearchBar
          onPress ={()=> router.push("/search")}
          placeholder="Search for a movie"
          />
          <>
          <Text className="text-lg text-white font bold mt-5 mb-3"> Lastest Movies</Text>
          <FlatList
                data={movies}
                renderItem={({ item }) => (
                  <Text className="text-white text-sm">
                    {item.title}
                  </Text>
                )}
                keyExtractor={(item) => item.id.toString()}
                numColumns={3}
                columnWrapperStyle={{
                  justifyContent: "flex-start", // Corrected value
                  gap: 10, // Assuming this is intentional
                  paddingBottom: 10,
                  paddingRight: 10,
                }}
              />
          </>
        </View>
        )}
      
      </ScrollView>
    </View> 
  );
}
