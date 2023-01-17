import { useState } from "react"
import { useSelector } from "react-redux"
import loadingsDot from '../imgs/loading-dots.gif'
import { useAddNewImageMutation } from '../features/imagesSlice'
import { Form, Container, Row, Col, Button } from "react-bootstrap"
import 'bootstrap/dist/css/bootstrap.min.css';
const Image = () => {
    const [file, setFile] = useState(false)
    const [imageId, setImageId] = useState(null)
    const handleChange = (e) => {
        setFile(e.target.files[0])
    }
    const [addNewImage, { isLoading, isError, error }] = useAddNewImageMutation()
    const handleClick = async (e) => {
        e.preventDefault()
        const fd = new FormData()
        fd.append('image', file, file.name)

        try {
            const data = await addNewImage(fd).unwrap()
            console.log(data)
            setImageId(data)
            setFile(null)
        } catch (error) {
            console.log(error)
        }
    }

    const canSave = Boolean(file) && !isLoading


    return (
        <Container className="pt-3">
            <Row className="justify-content-center">
                <Col xs='6'>
                    <div className="image-section">
                        {
                            imageId ?
                                <>
                                    <div className="imageContainer">
                                        <img className='image' src={`https://image-uploader-api-4ctd.onrender.com/api/image/${imageId}`} alt='image' />
                                        <a href={`https://image-uploader-api-4ctd.onrender.com//image/${imageId}`} target='_blank' id="imageLink">Show image as fullscreen</a>
                                    </div>

                                    <br />
                                </>

                                : (
                                    <p className='nopic'>no image yet</p>
                                )
                        }
                    </div>
                    <div className="inputcontainer">
                        {
                            isLoading ?
                                <img src={loadingsDot} className='loadingdots' alt='upload in progress' />
                                : (

                                    <Form.Group controlId="formFile" className="mb-3" encType='multipart/form-data' >
                                        <Form.Label>Select a file</Form.Label>
                                        <Form.Control type="file" onChange={handleChange} name="image" />
                                        <Button className="mt-3" disabled={!canSave} onClick={handleClick}>Submit</Button>
                                    </Form.Group>

                                )
                        }
                    </div>
                </Col>

            </Row>
        </Container>

    )
}

export default Image