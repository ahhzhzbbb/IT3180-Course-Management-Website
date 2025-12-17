import React from "react";
import Header from "../components/header";
import Footer from "../components/footer";
import Navigation from "../components/navigation-bar";
import CourseIntroCard from "../components/introduce/course";

export default function TrangChu() {
    return (
        <div className="app-container">
            <div className="app-header">
                <Header />
            </div>

            <div className="home-page">
                <div className="app-navigation">
                    <Navigation />
                </div>

                <div className="home-page-content">
                    {/* Hero banner giống F8 */}
                    <section className="hero-banner">
                        <div className="hero-content">
                            <h2 className="hero-title">
                                Về chúng tôi <span className="hero-crown">👑</span>
                            </h2>
                            <p className="hero-desc">
                                Nền tảng học chương trình cấp 3 trực tuyến miễn phí dành cho học sinh 
                            </p>
                            <button className="hero-cta">Nhận lộ trình học phù hợp</button>
                            <div className="hero-dots">
                                <span />
                                <span />
                                <span />
                                <span />
                                <span />
                            </div>
                        </div>
                        <div className="hero-media">
                            <img
                                src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=1200&auto=format&fit=crop"
                                alt="Học nhóm"
                            />
                        </div>
                    </section>

                    {/* Khóa học Pro */}
                    <section className="course-pro-section">
                        <div className="section-heading">
                            <h3>Khóa học</h3>
                            <span className="badge-new">Mới</span>
                        </div>
                        <div className="course-grid">
                            <CourseIntroCard
                                bannerTitle="Toán Học"
                                bannerSubtitle="Nâng cao kiến thức Toán học"
                                title="Toán 10 Chuyên"
                                priceLabel="Miễn phí"
                                students="50.000"
                                duration="16h00p"
                                gradient="linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)"
                            />
                            <CourseIntroCard
                                bannerTitle="Ngữ Văn"
                                bannerSubtitle="Khám phá văn học Việt Nam"
                                title="Ngữ Văn 11"
                                priceLabel="Miễn phí"
                                students="30.000"
                                duration="19h30p"
                                gradient="linear-gradient(135deg, #f7971e 0%, #ffd200 100%)"
                            />
                            <CourseIntroCard
                                bannerTitle="Vật Lý"
                                bannerSubtitle="Dành cho học sinh chuyên"
                                title="Vật Lý 10"
                                priceLabel="Miễn phí"
                                students="20.000"
                                duration="20h00p"
                                gradient="linear-gradient(135deg, #f71ed3ff 0%, #ff00d4ff 100%)"
                            />
                            <CourseIntroCard
                                bannerTitle="Hóa Học"
                                bannerSubtitle="Dành cho học sinh không chuyên"
                                title="Hóa học 10"
                                priceLabel="Miễn phí"
                                students="15.000"
                                duration="16h00p"
                                gradient="linear-gradient(135deg, #1ef754ff 0%, #09ff00ff 100%)"
                            />
                            <CourseIntroCard
                                bannerTitle="Hóa Học"
                                bannerSubtitle="Dành cho học sinh không chuyên"
                                title="Hóa học 12"
                                priceLabel="Miễn phí"
                                students="10.000"
                                duration="17h00p"
                                gradient="linear-gradient(135deg, #1eccf7ff 0%, #0099ffff 100%)"
                            />
                        </div>
                    </section>
                </div>
            </div>
            
            <Footer />
        </div>
    );
}
        
           
