import React, {useCallback} from 'react';
import {
  ActivityIndicator,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {useRecommendations} from 'vue-sdk-react-native';

import ButtonPrimary from './buttonPrimary';

const RecommendationScreen = () => {
  const {
    recommendations,
    getRecommendationsByStrategy,
    getRecommendationsByModule,
    getRecommendationsByPage,
  } = useRecommendations();

  const pageCorrelationId = '8504354e-3801-49a3-8200-5681e769fa67';
  const getRecommendationsPage = () => {
    const requestParams = {
      catalogs: {
        '3089e3d3ba': {
          fields: ['title', 'price', 'image_link', 'link'],
          context: {
            variant_id: '39596296700022',
          },
        },
      },
    };
    getRecommendationsByPage('PDP', requestParams, pageCorrelationId);
  };

  const getRecommendationsModule = () => {
    const requestParams = {
      catalogs: {
        '427e26dbfa': {
          fields: ['title', 'price', 'image_link', 'link'],
          context: {
            variant_id: '39596296700022',
          },
        },
      },
    };
    getRecommendationsByModule(
      'Similar Products Module - 27 June',
      requestParams,
      pageCorrelationId,
    );
  };

  const getRecommendationsStrategy = () => {
    const requestParams = {
      catalogs: {
        '427e26dbfa': {
          fields: ['title', 'price', 'image_link', 'link'],
          context: {
            variant_id: '39596296700022',
          },
        },
      },
    };
    getRecommendationsByStrategy(
      'Similar Products - 27June',
      requestParams,
      pageCorrelationId,
    );
  };

  const renderRecommendations = useCallback(
    recommendationsData => {
      return (
        <ScrollView horizontal>
          {recommendationsData?.length > 0 &&
            recommendationsData[0].data?.map((item: any, index: number) => (
              <View key={index} style={styles.productCard}>
                <View>
                  <Image
                    style={styles.productImage}
                    source={{uri: item.image_link}}
                  />
                </View>
                <View>
                  <Text numberOfLines={2} style={styles.productCardTitle}>
                    {item?.title}
                  </Text>
                  <Text style={styles.productPrice}>{`${item?.price}$`}</Text>
                </View>
              </View>
            ))}
        </ScrollView>
      );
    },
    [recommendations],
  );

  const renderLoader = () => {
    return <ActivityIndicator size={'large'} />;
  };

  return (
    <SafeAreaView style={styles.backgroundStyle}>
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={styles.backgroundStyle}>
        <ButtonPrimary
          onPress={getRecommendationsPage}
          buttonText={'Get getRecommendation by page'}
        />
        {recommendations.isLoading.isRecommendationsByPageLoading &&
          renderLoader()}
        {renderRecommendations(recommendations?.data?.recommendationsByPage)}
        <ButtonPrimary
          onPress={getRecommendationsModule}
          buttonText={'Get getRecommendation by module'}
        />
        {recommendations.isLoading.isRecommendationsByModuleLoading &&
          renderLoader()}
        {renderRecommendations(recommendations?.data?.recommendationsByModule)}
        <ButtonPrimary
          onPress={getRecommendationsStrategy}
          buttonText={'Get getRecommendation by strategy'}
        />
        {recommendations.isLoading.isRecommendationsByStrategyLoading &&
          renderLoader()}
        {renderRecommendations(
          recommendations?.data?.recommendationsByStrategy,
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  backgroundStyle: {
    flex: 1,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
  productCard: {
    padding: 10,
    margin: 5,
    backgroundColor: '#D2E9E9',
    borderRadius: 5,
    width: 170,
  },
  productCardTitle: {
    color: '#545B77',
    fontWeight: '700',
    paddingTop: 8,
  },
  productPrice: {
    color: '#545B77',
    fontWeight: '400',
    paddingTop: 4,
  },
  productImage: {
    width: 150,
    height: 200,
    borderRadius: 3,
  },
  input: {
    marginBottom: 16,
    padding: 8,
    borderColor: 'gray',
    borderWidth: 1,
  },
});

export default RecommendationScreen;
