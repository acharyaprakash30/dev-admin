import React, { useState } from 'react';
import {
    Carousel,
    CarouselItem,
    CarouselControl,
    CarouselIndicators,
    CarouselCaption,
    Modal,
    Button,
    ModalBody,
    ModalFooter,
    ModalHeader,
    Col,
    Row
} from 'reactstrap';



const ViewModal = (props) => {
    const { show, setShow, currentItem } = props;
    const [activeIndex, setActiveIndex] = useState(0);
    const [animating, setAnimating] = useState(false);

    const items = currentItem.images

    const next = () => {
        if (animating) return;
        if ( !items) setActiveIndex(0);
        const nextIndex = activeIndex === items?.length - 1 ? 0 : activeIndex + 1;
        setActiveIndex(nextIndex);
    }

    const previous = () => {
        if (animating) return;
        if ( !items) return setActiveIndex(0);
        const nextIndex = activeIndex === 0 ? items?.length - 1 : activeIndex - 1;
        setActiveIndex(nextIndex);
    }

    const goToIndex = (newIndex) => {
        if (animating) return;
        if ( !items) return setActiveIndex(0);
        setActiveIndex(newIndex);
    }

    const slides = items && items.map((item) => {
        return (
            <CarouselItem
                onExiting={() => setAnimating(true)}
                onExited={() => setAnimating(false)}
                key={item.url ? item.url : '-'}
            >
                <img src={item.url ? item.url : '-'} alt={item.altText ? item.altText : '-'} />
                <CarouselCaption captionText={item.caption ? item.caption : '-'} captionHeader={item.caption ? item.caption : '-'} />
            </CarouselItem>
        );
    });

    const slide =
        <CarouselItem key={currentItem.image}>
            <img src={currentItem.image} alt={currentItem.altText ? currentItem.altText : ''} />
            <CarouselCaption captionText={currentItem.caption ? currentItem.caption : ''} captionHeader={currentItem.caption ? currentItem.caption : ''} />
        </CarouselItem>;

    return (
        <Modal isOpen={show} toggle={() => { setShow(false) }} centered={true}>
            <ModalHeader toggle={() => { setShow(false) }}>{currentItem.name ? currentItem.name : " - "}</ModalHeader>
            <ModalBody>
                {/* {currentItem.image ?
                    <>
                        <Row>
                            <Col sm="12">
                                <Carousel
                                    activeIndex={activeIndex}
                                    next={next}
                                    previous={previous}
                                >
                                    <CarouselIndicators items={currentItem.images ? slides : [currentItem.image]} activeIndex={activeIndex} onClickHandler={goToIndex} />
                                    {currentItem.images ? slides : slide}
                                    <CarouselControl direction="prev" directionText="Previous" onClickHandler={previous} />
                                    <CarouselControl direction="next" directionText="Next" onClickHandler={next} />
                                </Carousel>
                            </Col>
                        </Row>
                        <br />
                    </>
                    : null
                } */}

                {currentItem.image ?
                    <>
                        <Row>
                            <Col sm="12">
                                <img src={currentItem.image} style={{maxHeight:"100%", maxWidth:"100%"}} alt={currentItem.name}/>
                            </Col>
                        </Row>
                        <br />
                    </>
                    : null
                }

                {currentItem.name ?
                    <Row>
                        <Col sm="4">
                            <b>Name: </b>
                        </Col>
                        <Col sm="8">
                            {currentItem.name}
                        </Col>
                    </Row>
                    : null
                }
                {currentItem.description ?
                    <Row>
                        <Col sm="4">
                        <b>Description: </b>
                        </Col>
                        <Col sm="8">
                            {currentItem.description}
                        </Col>
                    </Row>
                    : null
                }
                {currentItem.isActive ?
                    <Row>
                        <Col sm="4">
                        <b>IsActive: </b>
                        </Col>
                        <Col sm="8">
                            {currentItem.isActive}
                        </Col>
                    </Row>
                    : null
                }
            </ModalBody>
            <ModalFooter>
                <Button color="secondary" onClick={() => { setShow(false) }}>
                    Close
          </Button>
            </ModalFooter>
        </Modal>
    );
}

export default ViewModal;