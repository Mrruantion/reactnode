import './header.css';
import '../lib/swiper.min.css';
import React from 'react';
import Swiper from '../lib/swiper.min.js'
import fetchJsonp from 'fetch-jsonp';

let Header = React.createClass({
    getInitialState: function() {
        return {
            imgUrls: [],
        }
    },
    componentDidMount: function() {
        fetchJsonp(this.props.source).then((response) => {
            return response.json();
        }).then((data) => {
            if(data.status) {
                if(this.isMounted()) {
                    this.setState({
                        imgUrls: data.data,
                    })
                    new Swiper('#header .swiper-container', {
                        loop: true,
                        pagination: '.swiper-pagination',
                        paginationClickable: true,
                        autoplay: 3000,
                        autoplayDisableOnInteraction: false,
                    })
                }
            }else {
                alert(data.msg);
            }
        })
    },
    render: function () {
        let countId = 0;
        return (
            <div id="header">
                <div className="swiper-container">
                    <div className="swiper-wrapper">
                        {
                            this.state.imgUrls.map((url) => {
                            return <div className="swiper-slide" key={"header" + countId++} >
                                        <img className="img" src={url} />
                                    </div>
                            })
                        }
                    </div>
                    <div className="swiper-pagination"></div>
                </div>
            </div>
        );
    }
})
//Prop验证
Header.propTypes = {
    source: React.PropTypes.string.isRequired,
}
module.exports = Header;