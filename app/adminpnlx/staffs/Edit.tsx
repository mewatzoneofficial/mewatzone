import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { NavLink, useNavigate } from "react-router-dom";
import { showError, showSuccess } from "../utils/toast";
import API_URL, { STAFF_TITLE} from "../utils/config";

interface UserFormData {
  name: string;
  email: string;
  mobile: number;
  official_email?: string;
  official_mobile?: string;
  password: string;
  dob: string;
  joining_date: string;
  gender: "Male" | "Female" | "Other";
  status: "Active" | "Inactive";
  category: string[];
}

export default function EditUser() {
  const navigate = useNavigate();
  const today = new Date().toISOString().split("T")[0];

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<UserFormData>({
    defaultValues: {
      mobile: 9876543210,
      status: "Active",
      category: ["Education"],
      gender: "Male",
      dob: today,
      joining_date: today,
    },
  });

  const onSubmit: SubmitHandler<UserFormData> = async (formData) => {
    try {
      const res = await fetch(`${API_URL}users`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to create user");

      showSuccess("User created successfully");
      navigate("/users");
      reset();
    } catch (err) {
      console.error("❌ Error:", err);
      showError("Failed to create user.");
    }
  };

  return (
    <div className="container py-4">
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center mb-4">
        <h4 className="fw-semibold mb-3 mb-md-0">Edit {STAFF_TITLE}</h4>
        <NavLink to="/staffs" className="btn btn-outline-primary btn-sm me-2">
          <i className="fa-solid fa-list me-1"></i> {STAFF_TITLE}
        </NavLink>
      </div>

      <div className="card shadow-sm border-0 rounded-4 p-4">
        <form className="row g-3" onSubmit={handleSubmit(onSubmit)} noValidate>
          {/* Name */}
          <div className="col-md-6">
            <label className="form-label fw-medium">Name</label>
            <input
              type="text"
              {...register("name", { required: "Name is required." })}
              className={`form-control ${errors.name ? "is-invalid" : ""}`}
              placeholder="Enter full name"
            />
            {errors.name && (
              <div className="invalid-feedback">{errors.name.message}</div>
            )}
          </div>

          {/* Email */}
          <div className="col-md-6">
            <label className="form-label fw-medium">Email</label>
            <input
              type="email"
              {...register("email", {
                required: "Email is required.",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Invalid email format.",
                },
              })}
              className={`form-control ${errors.email ? "is-invalid" : ""}`}
              placeholder="example@email.com"
            />
            {errors.email && (
              <div className="invalid-feedback">{errors.email.message}</div>
            )}
          </div>

          {/* Mobile */}
          <div className="col-md-6">
            <label className="form-label fw-medium">Mobile</label>
            <input
              type="text"
              {...register("mobile", {
                required: "Mobile number is required.",
                pattern: {
                  value: /^[0-9]{10,11}$/,
                  message: "Enter a valid mobile number (10–11 digits).",
                },
              })}
              className={`form-control ${errors.mobile ? "is-invalid" : ""}`}
              placeholder="Enter mobile number"
            />
            {errors.mobile && (
              <div className="invalid-feedback">{errors.mobile.message}</div>
            )}
          </div>

          {/* Official Email */}
          <div className="col-md-6">
            <label className="form-label fw-medium">Official Email</label>
            <input
              type="email"
              {...register("official_email", {
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Invalid official email format.",
                },
              })}
              className="form-control" placeholder="official@example.com"
            />
            {errors.official_email && (
              <div className="invalid-feedback">{errors.official_email.message}</div>
            )}
          </div>

          {/* Official Mobile */}
          <div className="col-md-6">
            <label className="form-label fw-medium">Official Mobile</label>
            <input
              type="text"
              {...register("official_mobile", {
                pattern: {
                  value: /^[0-9]{10,12}$/,
                  message:
                    "Enter a valid official mobile number (10–12 digits).",
                },
              })}
              className="form-control" placeholder="Enter official mobile"
            />
            {errors.official_mobile && (
              <div className="invalid-feedback">{errors.official_mobile.message}</div>
            )}
          </div>

          {/* Password */}
          <div className="col-md-6">
            <label className="form-label fw-medium">Password</label>
            <input
              type="password"
              {...register("password", {
                required: "Password is required.",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters.",
                },
              })}
              className={`form-control ${errors.password ? "is-invalid" : ""}`}
              placeholder="••••••••"
            />
            {errors.password && (
              <div className="invalid-feedback">{errors.password.message}</div>
            )}
          </div>

          {/* Date of Birth */}
          <div className="col-md-6">
            <label className="form-label fw-medium">Date of Birth</label>
            <input
              type="date"
              {...register("dob", { required: "Date of birth is required." })}
              className={`form-control ${errors.dob ? "is-invalid" : ""}`}
            />
            {errors.dob && (
              <div className="invalid-feedback">{errors.dob.message}</div>
            )}
          </div>

          {/* Joining Date */}
          <div className="col-md-6">
            <label className="form-label fw-medium">Joining Date</label>
            <input
              type="date"
              {...register("joining_date", {
                required: "Joining date is required.",
              })}
              className={`form-control ${
                errors.joining_date ? "is-invalid" : ""
              }`}
            />
            {errors.joining_date && (
              <div className="invalid-feedback">
                {errors.joining_date.message}
              </div>
            )}
          </div>

          {/* Gender */}
          <div className="col-md-6">
            <label className="form-label fw-medium">Gender</label>
            <select
              {...register("gender", { required: "Select a valid gender." })}
              className={`form-select ${errors.gender ? "is-invalid" : ""}`}
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
            {errors.gender && (
              <div className="invalid-feedback">{errors.gender.message}</div>
            )}
          </div>

          {/* Status */}
          <div className="col-md-6">
            <label className="form-label fw-medium">Status</label>
            <div>
              <input
                type="radio"
                value="Active"
                id="status-Active"
                className="form-check-input"
                {...register("status", {
                  required: "Select a valid status.",
                })}
              />
              <label htmlFor="status-Active" className="form-check-label">
                Active
              </label>

              <input
                type="radio"
                value="Inactive"
                id="status-Inactive"
                className="form-check-input"
                {...register("status", {
                  required: "Select a valid status.",
                })}
              />
              <label htmlFor="status-Inactive" className="form-check-label">
                Inactive
              </label>
            </div>
            {errors.status && (
              <div className="invalid-feedback d-block">
                {errors.status.message}
              </div>
            )}
          </div>

          {/* Category */}
          <div className="col-md-6">
            <label className="form-label fw-medium">Category</label>
            <div>
              {["Health", "Finance", "Education"].map((cat) => (
                <div className="form-check" key={cat}>
                  <input
                    type="checkbox"
                    value={cat}
                    id={`category-${cat}`}
                    className="form-check-input"
                    {...register("category", {
                      required: "Select at least one category.",
                    })}
                  />
                  <label
                    htmlFor={`category-${cat}`}
                    className="form-check-label"
                  >
                    {cat}
                  </label>
                </div>
              ))}
            </div>
            {errors.category && (
              <div className="invalid-feedback d-block">
                {errors.category.message}
              </div>
            )}
          </div>

          {/* Submit */}
          <div className="col-12 text-end mt-3">
            <button
              type="submit"
              className="btn btn-success px-4"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <span
                    className="spinner-border spinner-border-sm me-2"
                    role="status"
                    aria-hidden="true"
                  ></span>
                  Saving...
                </>
              ) : (
                <>
                  <i className="fa-solid fa-save me-2"></i> save
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
