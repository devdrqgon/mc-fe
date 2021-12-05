import CardButton from 'components/ui/CardButtons'
import React from 'react'
import './styles.css'
const ClonedModal = () => {
    return (
        <>
            <div className="container">
                <div className="row">
                    <div className="col-sm-24">
                        <a href="#modal1" className="button">
                            Open Modal Overlay 1
                        </a>
                    </div>
                </div>
            </div>
            <div id="modal1" className="overlay">
                <div className="modal">
                    <h2>This is Modal Overlay 1</h2>
                    <div className="content">
                        <p>Click outside the modal to close.</p>
                    </div>
                </div>
            </div>
            <div className="container">
                <div className="row">
                    <div className="col-sm-24">
                        <a href="#modal2" className="button">
                            Open Modal Overlay 2
                        </a>
                    </div>
                </div>
            </div>
            <div id="modal2" className="overlay">
            <a className="cancel" href="#_"></a>
                <div className="modal">
                    <h2>This is Modal Overlay 2</h2>
                    <div className="content">
                        <p>Click outside the modal to close.</p>
                    </div>
                </div>
            </div>
            <CardButton >  Open Me </CardButton>
        </>
    )
}

export default ClonedModal
