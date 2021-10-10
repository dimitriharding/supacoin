import React, { useState, useCallback, useEffect } from "react";
import { Box, Container } from "@chakra-ui/react";
import PhotoGallery from "react-photo-gallery";
import Carousel, { Modal, ModalGateway } from "react-images";
import { getNFTs } from "../utils/index";
import PageTitle from "../components/PageTitle";
import { useWeb3 } from "../utils/web3Context";

function Gallery() {
  const { checkIfWalletIsConnected } = useWeb3();
  const [currentImage, setCurrentImage] = useState(0);
  const [viewerIsOpen, setViewerIsOpen] = useState(false);
  const [photos, setPhotos] = useState([]);

  const openLightbox = useCallback((event, { photo, index }) => {
    setCurrentImage(index);
    setViewerIsOpen(true);
  }, []);

  const closeLightbox = () => {
    setCurrentImage(0);
    setViewerIsOpen(false);
  };

  useEffect(() => {
    (async () => {
      await checkIfWalletIsConnected();
      const nfts = await getNFTs();
      setPhotos(nfts);
    })();
  }, []);

  return (
    <Box as={Container} maxW={"7xl"} minH={950} py={{ base: 24, lg: 32 }}>
      <PageTitle
        title="Supacoin NFT Gallery"
        subTitle="View some of the Supacoin images, that you will be able to mint on the Polygon chain."
        colorLeft="purple.500"
        colorRight="teal.500"
      />
      {photos?.length > 0 && (
        <>
          <PhotoGallery photos={photos} onClick={openLightbox} />
          <ModalGateway>
            {viewerIsOpen ? (
              <Modal onClose={closeLightbox}>
                <Carousel
                  currentIndex={currentImage}
                  views={photos.map((x: any) => ({
                    ...x,
                    srcset: x.srcSet,
                    caption: x.title,
                  }))}
                />
              </Modal>
            ) : null}
          </ModalGateway>
        </>
      )}
    </Box>
  );
}

export default Gallery;
