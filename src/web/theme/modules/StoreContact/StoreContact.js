import React from "react";
import PropTypes from "prop-types";
import Paragraph from "theme/components/atoms/Typography/Paragraph";
import Link from "theme/components/atoms/Typography/Link";

const StoreContact = ({ phone }) => {
  return (
    <Paragraph>
      Need help? Call us at{" "}
      <Link to={`tel:${phone}`} external type="reversed">
        {phone}
      </Link>
    </Paragraph>
  );
};

StoreContact.propTypes = {
  phone: PropTypes.string.isRequired
};

export default StoreContact;
