import { useState, useEffect } from "react";
import {
  Box,
  Typography,
  TextField,
  MenuItem,
  Button,
  Grid,
  Divider,
  Autocomplete,
} from "@mui/material";

import { CKEditor } from "@ckeditor/ckeditor5-react";
import {
  ClassicEditor,
  Essentials,
  Paragraph,
  Bold,
  Italic,
  List,
  Heading,
  Link,
  Alignment,
} from "ckeditor5";
import "ckeditor5/ckeditor5.css";

import SendIcon from "@mui/icons-material/Send";

import api from "../../plugins/axios";
import { useNavigate } from "react-router";
import NotificationDialog from "../../components/NotificationDialog";
import { CITIES_DATA } from "../../plugins/cities";

const PostJob = () => {
  const navigate = useNavigate();
  const [openPopup, setOpenPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");
  const [isSuccessPopup, setIsSuccessPopup] = useState(false);
  const [redirectAfterClose, setRedirectAfterClose] = useState(false);

  // Bảo vệ trang để chỉ nhà tuyển dụng đã đăng nhập mới được sử dụng.
  useEffect(() => {
    const token = localStorage.getItem("access_token");
    const userRole = localStorage.getItem("user_role");

    // Người chưa đăng nhập phải tạo tài khoản doanh nghiệp trước khi đăng tin.
    if (!token) {
      navigate("/employer-register");
      return;
    }

    // Người dùng đã đăng nhập nhưng không có quyền EMPLOYER không được truy cập form.
    if (userRole !== "EMPLOYER") {
      setPopupMessage("Tính năng này chỉ dành cho tài khoản Nhà tuyển dụng!");
      setIsSuccessPopup(false);
      setRedirectAfterClose(true);
      setOpenPopup(true);
    }
  }, [navigate]);

  const [categoriesData, setCategoriesData] = useState([]);

  const [availableSpecialties, setAvailableSpecialties] = useState([]);

  const [formData, setFormData] = useState({
    title: "",
    category: "",
    specialty: "",
    job_type: "FULL_TIME",
    experience_level: "Nhân viên",
    gender: "NOT_REQUIRED",
    quantity: 1,
    salary: {
      type: "RANGE",
      min: 10000000,
      max: 20000000,
      currency: "VND",
      is_negotiable: false,
    },
    work_location: [
      {
        city_id: null,
        city_name: "",
        address_detail: "",
      },
    ],
    deadline: "",
    is_hot: false,
    description_html:
      "<h4>1. Mô tả công việc</h4><p>Nhập chi tiết mô tả...</p>",
    requirements_html:
      "<h4>2. Yêu cầu ứng viên</h4><p>Nhập chi tiết yêu cầu...</p>",
    benefits_html: "<h4>3. Quyền lợi</h4><p>Nhập chi tiết quyền lợi...</p>",
  });

  // Tải danh mục và chọn sẵn nhóm ngành đầu tiên.
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data } = await api.get("/api/v1/categories");
        setCategoriesData(data);
        if (data && data.length > 0) {
          setFormData((prev) => ({
            ...prev,
            category: data[0].group_name,
            specialty: data[0].categories?.[0]?.name || "",
          }));
          setAvailableSpecialties(data[0].categories || []);
        }
      } catch (error) {
        console.log("Lỗi lấy danh mục nghề:", error);
      }
    };
    fetchCategories();
  }, []);

  // Cập nhật trường dữ liệu và tải lại chuyên ngành khi đổi nhóm ngành.
  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "category") {
      const selectedGroup = categoriesData.find(
        (item) => item.group_name === value,
      );
      const subCategories = selectedGroup ? selectedGroup.categories : [];

      setAvailableSpecialties(subCategories);
      setFormData({
        ...formData,
        category: value,
        specialty: subCategories.length > 0 ? subCategories[0].name : "",
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  // Cập nhật một giá trị trong đối tượng lương.
  const handleSalaryChange = (field, value) => {
    setFormData({
      ...formData,
      salary: {
        ...formData.salary,
        [field]: value,
      },
    });
  };

  // Lưu tỉnh/thành phố được chọn vào địa điểm làm việc.
  const handleCityChange = (event, selectedCity) => {
    setFormData({
      ...formData,
      work_location: [
        {
          ...formData.work_location[0],
          city_id: selectedCity ? selectedCity.id : null,
          city_name: selectedCity ? selectedCity.name : "",
        },
      ],
    });
  };

  // Lưu địa chỉ chi tiết của tỉnh/thành phố đã chọn.
  const handleLocationChange = (e) => {
    const value = e.target.value;
    setFormData({
      ...formData,
      work_location: [
        {
          ...formData.work_location[0],
          address_detail: value,
        },
      ],
    });
  };

  // Trả về thông báo lỗi nếu form đăng tuyển chưa đầy đủ.
  const validateForm = () => {
    // Kiểm tra lần lượt các nhóm dữ liệu để trả về lỗi đầu tiên cần người dùng sửa.
    if (!formData.title || formData.title.trim() === "") {
      return "Vui lòng nhập tiêu đề công việc!";
    }
    if (!formData.category || formData.category.trim() === "") {
      return "Vui lòng chọn ngành nghề!";
    }
    if (!formData.specialty || formData.specialty.trim() === "") {
      return "Vui lòng chọn chuyên ngành!";
    }
    if (!formData.work_location[0].city_id) {
      return "Vui lòng chọn Tỉnh / Thành phố làm việc!";
    }
    if (
      !formData.work_location[0].address_detail ||
      formData.work_location[0].address_detail.trim() === ""
    ) {
      return "Vui lòng nhập địa chỉ chi tiết làm việc!";
    }
    if (!formData.deadline) {
      return "Vui lòng chọn hạn nộp hồ sơ!";
    }
    if (
      new Date(formData.deadline).getTime() < new Date().setHours(0, 0, 0, 0)
    ) {
      return "Hạn nộp hồ sơ không được nhỏ hơn ngày hôm nay!";
    }
    if (formData.salary.type === "RANGE") {
      // Với kiểu lương RANGE, cả mức tối thiểu và tối đa đều phải hợp lệ.
      if (formData.salary.min === "" || formData.salary.max === "") {
        return "Vui lòng nhập đầy đủ khoảng lương tối thiểu và tối đa!";
      }
      if (Number(formData.salary.min) > Number(formData.salary.max)) {
        return "Lương tối thiểu không được lớn hơn lương tối đa!";
      }
    }
    if (!formData.quantity || Number(formData.quantity) <= 0) {
      return "Số lượng tuyển phải lớn hơn 0!";
    }
    return null;
  };

  // Kiểm tra và gửi tin tuyển dụng mới lên API.
  const handlePostJob = async () => {
    const errorMessage = validateForm();
    if (errorMessage) {
      // Không gọi API nếu form còn lỗi; hiển thị lỗi ngay trên giao diện.
      setIsSuccessPopup(false);
      setPopupMessage(errorMessage);
      setOpenPopup(true);
      return;
    }

    try {
      // Gửi toàn bộ thông tin công việc, lương và địa điểm đến endpoint dành cho employer.
      await api.post("/api/v1/employer/jobs", formData);
      setIsSuccessPopup(true);
      setPopupMessage("Đăng tin tuyển dụng thành công!");
      setOpenPopup(true);
    } catch (error) {
      // Hiển thị lỗi do backend trả về hoặc dùng thông báo mặc định nếu không có chi tiết.
      const errorMsg =
        error.response?.data?.detail?.[0]?.msg ||
        error.response?.data?.message ||
        "Có lỗi xảy ra khi tạo tin tuyển dụng. Vui lòng kiểm tra lại.";
      setIsSuccessPopup(false);
      setPopupMessage(errorMsg);
      setOpenPopup(true);
    }
  };

  // Đóng hộp thoại kết quả và quay về trang chủ khi cần.
  const handleClosePopup = () => {
    setOpenPopup(false);
    if (isSuccessPopup || redirectAfterClose) {
      navigate("/");
      setRedirectAfterClose(false);
    }
  };

  return (
    <Box sx={{ bgcolor: "#f4f5f5", minHeight: "100vh", py: 4 }}>
      <Box
        sx={{
          width: "100%",
          maxWidth: "1000px",
          margin: "0 auto",
          px: "15px",
        }}
      >
        <Typography
          variant="h5"
          sx={{ fontWeight: 700, color: "#212f3f", mb: 3 }}
        >
          Tạo tin tuyển dụng mới
        </Typography>

        <Box
          sx={{
            bgcolor: "#fff",
            p: 4,
            borderRadius: "8px",
            border: "1px solid #e5e7eb",
          }}
        >
          <Typography
            variant="h6"
            sx={{ fontWeight: 700, color: "#00b14f", mb: 2 }}
          >
            1. Thông tin chung
          </Typography>

          <Grid container spacing={3}>
            <Grid size={{ xs: 12 }}>
              <TextField
                fullWidth
                label="Tiêu đề công việc *"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="VD: Lập trình viên ReactJS (Mid/Senior)"
              />
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                select
                label="Ngành nghề *"
                name="category"
                value={formData.category}
                onChange={handleChange}
              >
                {categoriesData.map((group) => (
                  <MenuItem key={group.id} value={group.group_name}>
                    {group.group_name}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                select
                label="Chuyên ngành *"
                name="specialty"
                value={formData.specialty}
                onChange={handleChange}
              >
                {availableSpecialties.map((sub) => (
                  <MenuItem key={sub.id} value={sub.name}>
                    {sub.name}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                select
                label="Cấp bậc"
                name="experience_level"
                value={formData.experience_level}
                onChange={handleChange}
              >
                <MenuItem value="Thực tập sinh">Thực tập sinh</MenuItem>
                <MenuItem value="Nhân viên">Nhân viên</MenuItem>
                <MenuItem value="Trưởng phòng">Trưởng phòng</MenuItem>
                <MenuItem value="Senior">Senior</MenuItem>
              </TextField>
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                select
                label="Hình thức làm việc"
                name="job_type"
                value={formData.job_type}
                onChange={handleChange}
              >
                <MenuItem value="FULL_TIME">Toàn thời gian</MenuItem>
                <MenuItem value="PART_TIME">Bán thời gian</MenuItem>
                <MenuItem value="FREELANCE">Freelance</MenuItem>
                <MenuItem value="INTERNSHIP">Thực tập</MenuItem>
              </TextField>
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                select
                label="Yêu cầu giới tính"
                name="gender"
                value={formData.gender}
                onChange={handleChange}
              >
                <MenuItem value="MALE">Nam</MenuItem>
                <MenuItem value="FEMALE">Nữ</MenuItem>
                <MenuItem value="NOT_REQUIRED">Không yêu cầu</MenuItem>
              </TextField>
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                type="number"
                label="Số lượng tuyển *"
                name="quantity"
                value={formData.quantity}
                onChange={handleChange}
              />
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                select
                label="Hình thức trả lương"
                value={formData.salary.type}
                onChange={(e) => handleSalaryChange("type", e.target.value)}
              >
                <MenuItem value="RANGE">Khoảng giá (Range)</MenuItem>
                <MenuItem value="AGREEMENT">Thoả thuận</MenuItem>
              </TextField>
            </Grid>

            {formData.salary.type === "RANGE" && (
              <>
                <Grid size={{ xs: 12, md: 3 }}>
                  <TextField
                    fullWidth
                    type="number"
                    label="Lương tối thiểu (VND) *"
                    value={formData.salary.min}
                    onChange={(e) => handleSalaryChange("min", e.target.value)}
                  />
                </Grid>
                <Grid size={{ xs: 12, md: 3 }}>
                  <TextField
                    fullWidth
                    type="number"
                    label="Lương tối đa (VND) *"
                    value={formData.salary.max}
                    onChange={(e) => handleSalaryChange("max", e.target.value)}
                  />
                </Grid>
              </>
            )}

            <Grid size={{ xs: 12, md: 6 }}>
              <Autocomplete
                options={CITIES_DATA}
                getOptionLabel={(option) => option.name}
                value={
                  CITIES_DATA.find(
                    (c) => c.id === formData.work_location[0].city_id,
                  ) || null
                }
                onChange={handleCityChange}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Tỉnh / Thành phố *"
                    placeholder="Gõ để tìm nhanh tên tỉnh/thành..."
                  />
                )}
              />
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                label="Địa chỉ chi tiết làm việc *"
                placeholder="VD: Tòa nhà A, Số 47 Nguyễn Tuân"
                value={formData.work_location[0].address_detail}
                onChange={handleLocationChange}
              />
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <Box
                component="label"
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 0.5,
                  cursor: "pointer",
                }}
              >
                <Typography
                  variant="body2"
                  fontWeight={600}
                  sx={{ color: "#212f3f" }}
                >
                  Hạn nộp hồ sơ *
                </Typography>
                <TextField
                  fullWidth
                  type="date"
                  value={
                    formData.deadline ? formData.deadline.split("T")[0] : ""
                  }
                  onChange={(e) => {
                    const selectedDate = e.target.value;
                    setFormData({
                      ...formData,
                      deadline: selectedDate
                        ? new Date(selectedDate).toISOString()
                        : "",
                    });
                  }}
                  inputProps={{
                    onClick: (e) => {
                      if (typeof e.target.showPicker === "function") {
                        e.target.showPicker();
                      }
                    },
                    style: { cursor: "pointer" },
                  }}
                />
              </Box>
            </Grid>
          </Grid>

          <Divider sx={{ my: 4 }} />

          <Typography
            variant="h6"
            sx={{ fontWeight: 700, color: "#00b14f", mb: 2 }}
          >
            2. Chi tiết mô tả công việc
          </Typography>

          <Box sx={{ mb: 3, "& .ck-editor__editable": { minHeight: "200px" } }}>
            <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 600 }}>
              Mô tả công việc
            </Typography>
            <CKEditor
              editor={ClassicEditor}
              config={{
                licenseKey: "GPL",
                plugins: [
                  Essentials,
                  Paragraph,
                  Bold,
                  Italic,
                  List,
                  Heading,
                  Link,
                  Alignment,
                ],
                toolbar: [
                  "heading",
                  "|",
                  "bold",
                  "italic",
                  "|",
                  "alignment",
                  "|",
                  "bulletedList",
                  "numberedList",
                  "|",
                  "link",
                  "undo",
                  "redo",
                ],
              }}
              data={formData.description_html}
              onChange={(event, editor) => {
                setFormData({
                  ...formData,
                  description_html: editor.getData(),
                });
              }}
            />
          </Box>

          <Box sx={{ mb: 3, "& .ck-editor__editable": { minHeight: "200px" } }}>
            <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 600 }}>
              Yêu cầu ứng viên
            </Typography>
            <CKEditor
              editor={ClassicEditor}
              config={{
                licenseKey: "GPL",
                plugins: [
                  Essentials,
                  Paragraph,
                  Bold,
                  Italic,
                  List,
                  Heading,
                  Link,
                  Alignment,
                ],
                toolbar: [
                  "heading",
                  "|",
                  "bold",
                  "italic",
                  "|",
                  "alignment",
                  "|",
                  "bulletedList",
                  "numberedList",
                  "|",
                  "link",
                  "undo",
                  "redo",
                ],
              }}
              data={formData.requirements_html}
              onChange={(event, editor) => {
                setFormData({
                  ...formData,
                  requirements_html: editor.getData(),
                });
              }}
            />
          </Box>

          <Box sx={{ mb: 3, "& .ck-editor__editable": { minHeight: "200px" } }}>
            <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 600 }}>
              Quyền lợi được hưởng
            </Typography>
            <CKEditor
              editor={ClassicEditor}
              config={{
                licenseKey: "GPL",
                plugins: [
                  Essentials,
                  Paragraph,
                  Bold,
                  Italic,
                  List,
                  Heading,
                  Link,
                  Alignment,
                ],
                toolbar: [
                  "heading",
                  "|",
                  "bold",
                  "italic",
                  "|",
                  "alignment",
                  "|",
                  "bulletedList",
                  "numberedList",
                  "|",
                  "link",
                  "undo",
                  "redo",
                ],
              }}
              data={formData.benefits_html}
              onChange={(event, editor) => {
                setFormData({ ...formData, benefits_html: editor.getData() });
              }}
            />
          </Box>

          <Divider sx={{ my: 4 }} />

          <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2 }}>
            <Button
              variant="contained"
              onClick={handlePostJob}
              startIcon={<SendIcon />}
              sx={{
                bgcolor: "#00b14f",
                textTransform: "none",
                fontWeight: 600,
                px: 4,
                "&:hover": { bgcolor: "#009944" },
              }}
            >
              Đăng tin tuyển dụng
            </Button>
          </Box>
        </Box>
      </Box>

      <NotificationDialog
        open={openPopup}
        onClose={handleClosePopup}
        message={popupMessage}
        isSuccess={isSuccessPopup}
      />
    </Box>
  );
};

export default PostJob;
