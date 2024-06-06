/* eslint-disable import/no-unresolved */
import React from 'react';
import { withStyles, Button } from '@material-ui/core';
import PropTypes from 'prop-types';
import withLayout from '../../src/lib/with-layout';
import { MAX_CONTENT_WIDTH } from '../../components/constants';

const styles = (theme) => ({
  projects_container: {
    maxWidth: MAX_CONTENT_WIDTH,
    margin: '6em auto',
    [theme.breakpoints.down('sm')]: {
      margin: '3em auto'
    },
    padding: '0 2em',
    listStyle: 'none',
    '&>p': {
      ...theme.typography.subtitle1,
      textAlign: 'center'
    }
  },
  projects: {
    borderTop: '1px solid #f0edea',
    padding: '1em 0',
    '& p, span': {
      ...theme.typography.body1,
      color: '#666'
    },
    '& h5': {
      ...theme.typography.h5,
      margin: '1em 0'
    },
    '& span': {
      fontSize: '0.9em'
    },
    '& a': {
      textDecoration: 'none',
      color: 'inherit'
    },
    '& code': {
      fontFamily: '"Inconsolata", monospace',
      backgroundColor: 'rgba(27,31,35,.05)',
      padding: '1px 5px'
    }
  }
});

const downloadReport = (report_path) => {
    const link = document.createElement('a');
    link.href = report_path;  // Update this path to the location of your PDF file
    link.download = 'report.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

const Projects = (props) => {
  const { classes } = props;
  return (
    <ul className={classes.projects_container}>
      <li className={classes.projects}>
        <span>June 6th, 2024</span>
        <h5>
        Projected Attention Layers in BERT for Multi Task
        </h5>
        <p>
        <b>Abstract:</b> <i>We examine different approaches to improve the performance of the Bidirectional Encoder 
        Representations from Transformers (BERT) on three downstream tasks: Sentiment Analysis, 
        Paraphrase Detection, and Semantic Text Similarity (STS). 
        Throughout our experimentation, a variety of different fine-tuning strategies and advanced techniques 
        were leveraged including implementing Projected Attention Layers (PALs), multi-GPU training, 
        Unsupervised Contrastive Learning of Sentence Embeddings (SimCSE), adding relational layers, hyperparameter 
        tuning, and fine-tuning on additional datasets. We have found that a combination of PALs, 
        unsupervised SimCSE, and additional relational layers resulted in the largest improvements in system accuracy.</i>
        </p>
        <Button variant="contained" onClick={() => downloadReport('/projects/cs231_report.pdf')}>
        Download Report
        </Button>
      </li>
      <li className={classes.projects}>
        <span>June 6th, 2024</span>
        <h5>
        Generating Synthetic Chest X-Ray using Generative Modeling
        </h5>
        <p>
        <b>Abstract:</b> <i>In the field of medical imaging, accurate classification of Chest X-rays (CXRs) is vital for timely and
        effective diagnosis. The advances of Deep Learning in Computer Vision has enabled the possibility to
        build CAD (Computer Aided Diagnosis) systems, which can assist the radiologists with CXR diagnosis.
        However, medical imaging datasets like CXR images are limited in size and availability due to privacy
        concerns. Due to the diversity of health conditions, anatomical structures, and different angles of the
        X-rays (posterior-anterior, anterior-posterior, lateral) simple image augmentation methods, such as
        rotation, flipping, varying lighting etc. would not capture the biological variance, resulting in genera-
        tion of unrealistic images. Recently, using generative models to augment datasets using synthetic
        X-rays, have shown to improve classification in multiple studies.
        In this study, we explore three generative algorithms, Variational Autoencoders (VAE), Gaussian
        Mixture Variational Autoencoders (GMVAE), and Generative Adversarial Networks (GAN), for
        generating synthetic chest X-ray images.</i>
        </p>
        <Button variant="contained" onClick={() => downloadReport('/projects/cs231_report.pdf')}>
        Download Report
        </Button>
      </li>

      
    </ul>
  );
};

Projects.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withLayout(withStyles(styles)(Projects), 'A6kme-Projects');
