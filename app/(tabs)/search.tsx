import { View, Text, Image, FlatList, ActivityIndicator, } from 'react-native'
import React, { useEffect, useState } from 'react'
import { images } from '@/constants/images'
import MovieCard from '@/components/MovieCard'
import useFetch from '@/services/useFetch'
import { fetchMovies } from '@/services/api'
import { icons } from '@/constants/icons'
import SearchBar from '@/components/SearchBar'
import { updateSearchCount } from '@/services/appwrite'

const search = () => {
  const [searchQery, setSearchQery]=useState('');


  const {
    data: movies, 
    loading: moviesLoading, 

    error: moviesError,
    refetch:loadMovies,
    reset
  } = useFetch(() => fetchMovies({
    query: searchQery,
  }), false)

  useEffect(()=>{
    const timeoutId = setTimeout( async () => {
    if (searchQery.trim()){
      await loadMovies();
      console.log(movies)
    }
    
    else{
        reset();
      }
    },500);
  
    return () => clearTimeout(timeoutId);
   
  },[searchQery])
  return (
    <View className='flex-1 bg-primary'>
      <Image source={images.bg} className='flex-1 absolute w-full z-0' resizeMode='cover'></Image>
      <FlatList 
      data={movies} renderItem={({item}) => <MovieCard {...item}/>}
      keyExtractor={(item) => item.id.toString()}
      className='px-5'
      numColumns={3}
      columnWrapperStyle={{
        justifyContent: 'center',
        gap: 16,
        marginVertical:16
      }}
      contentContainerStyle={{
        paddingBottom: 100,
      }}
      ListHeaderComponent={
        <>
          <View className='wifull flex-row justify-center mt-20 items-center'>
            <Image source={icons.logo} className='w-12 h-10'/>
          </View>

          <View className='my-5'>
            <SearchBar 
            placeholder='Search movies ...'
            value={searchQery}
            onChangeText ={(text:string)=> setSearchQery(text)}

            ></SearchBar>
          </View>
          {moviesLoading && (
            <ActivityIndicator size="large" color="0000ff" className='my-3'/>
          )}
          {moviesError && (
            <Text className='text-red-500 px-5 my-3'> Error: {moviesError.message}</Text>
          )}

          {!moviesLoading && !moviesError && searchQery.trim() && movies?.length > 0 &&(
            <Text>
              Search results for {' '}
              <Text className='text-accent'>{searchQery}</Text>
            </Text>
          )}

        </>
      }
      ListEmptyComponent={
        !moviesLoading && !moviesError?(
          <View className='mt-10 px-5'>
            <Text className='text-center text-gray-500'>
              {searchQery.trim() ? 'No results found' : 'Search for movies'}
            </Text>
          </View>
        ):null
      }
      />
    </View>
  )
}

export default search