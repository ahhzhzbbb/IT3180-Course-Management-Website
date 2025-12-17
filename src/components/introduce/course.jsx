import React from "react";

/**
 * CourseIntroCard – thẻ khóa học giống ảnh mẫu
 * Props (tùy chọn):
 * - bannerTitle: tiêu đề trên banner
 * - bannerSubtitle: mô tả nhỏ trên banner
 * - title: tên khóa học
 * - priceLabel: nhãn giá (VD: "Miễn phí")
 * - students: số người học (vd: "137.973")
 * - duration: thời lượng (vd: "3h12p")
 * - gradient: chuỗi CSS gradient cho phần banner
 */
export default function CourseIntroCard({
	bannerTitle = "Kiến Thức Nền Tảng",
	bannerSubtitle = "Kiến thức nhập môn{}",
	title = "Kiến Thức Nhập Môn IT",
	priceLabel = "Miễn phí",
	students = "137.973",
	duration = "3h12p",
	gradient = "linear-gradient(135deg,#ff5f6d 0%, #7a5cff 100%)",
	onClick,
}) {
	return (
		<div className="course-tile" role="button" tabIndex={0} onClick={onClick}>
			<div className="course-tile-banner" style={{ background: gradient }}>
				<div className="course-tile-banner-content">
					<h4 className="course-tile-banner-title">{bannerTitle}</h4>
					<p className="course-tile-banner-sub">{bannerSubtitle}</p>
				</div>
				<div className="course-tile-banner-shape" aria-hidden />
			</div>

			<div className="course-tile-body">
				<h3 className="course-tile-name">{title}</h3>
				<div className="course-tile-price">{priceLabel}</div>

				<div className="course-tile-meta">
					<span className="course-tile-meta-item" aria-label="Học viên">
						<span className="course-tile-ico" role="img" aria-hidden>
							👥
						</span>
						{students}
					</span>
					<span className="course-tile-dot" />
					<span className="course-tile-meta-item" aria-label="Thời lượng">
						<span className="course-tile-ico" role="img" aria-hidden>
							🕒
						</span>
						{duration}
					</span>
				</div>
			</div>
		</div>
	);
}

// Demo xuất kèm để xem nhanh (không bắt buộc dùng)
export function CourseIntroCardDemo() {
	return (
		<div style={{ padding: 16, maxWidth: 320 }}>
			<CourseIntroCard />
		</div>
	);
}

