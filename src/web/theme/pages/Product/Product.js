import React from "react";
import { Redirect, withRouter } from "react-router";
import compose from "recompose/compose";
import withProps from "recompose/withProps";

import EnhanceProduct from "./EnhanceProduct";
import ProductQuery from "./ProductQuery.gql";
import PageWithMedia from "theme/components/templates/PageWithMedia";
import ProductSynthesis from "theme/modules/ProductSynthesis";
import HeroImage from "theme/modules/HeroImage";
import LoadingArea from "theme/components/molecules/LoadingArea";
import Loading from "theme/components/atoms/Loading";
import createMediaUrlFromPath from "../../../utils/createMediaUrlFromPath";

const Product = ({ loading, product }) => {
  if (loading) {
    return (
      <LoadingArea>
        <Loading />
      </LoadingArea>
    );
  } else if (!product) {
    return <Redirect to="/not-found" />;
  }

  return (
    <div>
      <PageWithMedia
        media={
          <HeroImage
            path={createMediaUrlFromPath(product.imageUrl)}
            alt={product.name}
          />
        }
      >
        <ProductSynthesis product={product} />
      </PageWithMedia>
    </div>
  );
};

export default compose(
  withRouter,
  withProps(props => ({ sku: props.sku || props.match.params.sku })),
  EnhanceProduct(ProductQuery)
)(Product);
