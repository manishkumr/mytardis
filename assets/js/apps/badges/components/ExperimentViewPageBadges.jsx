import React, { Fragment, useState } from 'react';
import ReactDOM from 'react-dom';

import PropTypes from 'prop-types';
import { css } from '@emotion/core';
import ExperimentLastUpdatedBadge from './ExperimentLastUpdateBadge';
import PublicAccessBadge from './PublicAccessBadge';
import DatasetCountBadge from './DatasetCountBadge';
import DatafileCountBadge from './DatafileCountBadge';
import { fetchExperimentData } from './utils/FetchData';
import Spinner from './utils/Spinner';
import ExperimentSizeBadge from './ExperimentSizeBadge';


const ExperimentViewPageBadges = ({ experimentID }) => {
  const [expData, setExpData] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const spinnerCss = css`
    width: 20%;
    color: 9B9B9B;
    float: right;
  `;

  React.useEffect(() => {
    fetchExperimentData(experimentID).then((data) => {
      setExpData(data);
      setIsLoading(false);
    });
  }, []);

  return (
    isLoading ? (
      <Fragment>
        <Spinner override={spinnerCss} />
      </Fragment>
    )
      : (
        <Fragment>
          <span className="mr-2">
            <DatasetCountBadge experimentData={expData} />
          </span>
          <span className="mr-2">
            <DatafileCountBadge experimentData={expData} />
          </span>
          <span className="mr-2">
            <ExperimentSizeBadge experimentData={expData} />
          </span>
          <span className="mr-2">
            <ExperimentLastUpdatedBadge experimentData={expData} />
          </span>
          <span className="mr-2">
            <PublicAccessBadge experimentData={expData} />
          </span>
        </Fragment>
      )
  );
};

ExperimentViewPageBadges.propTypes = {
  experimentID: PropTypes.string.isRequired,
};

const elem = document.querySelector('.badges');
let experimentID = null;
if (elem) {
  [, experimentID] = elem.id.split('-');
  ReactDOM.render(
    <ExperimentViewPageBadges experimentID={experimentID} />, elem,
  );
}

export default ExperimentViewPageBadges;