"use client"

import { useState } from "react"
import { Mail, Phone, MapPin, Send } from "lucide-react"

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })
  const [status, setStatus] = useState("")

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you can connect API or email service like Resend or Formspree
    setStatus("Thank you! Your message has been sent.")
    setFormData({ name: "", email: "", message: "" })
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-pink-50 to-orange-50">
      <div className="max-w-5xl mx-auto px-6 py-16">
        {/* Header */}
        <h1 className="text-4xl font-extrabold text-center bg-gradient-to-r from-yellow-400 via-orange-400 to-pink-500 bg-clip-text text-transparent">
          Contact Us
        </h1>
        <p className="text-center text-gray-600 mt-4">
          We'd love to hear from you! Fill out the form below or reach out directly.
        </p>

        {/* Contact Info */}
        <div className="mt-10 grid md:grid-cols-3 gap-6 text-center">
          <div className="p-6 bg-white rounded-2xl shadow hover:shadow-md transition">
            <Mail className="mx-auto text-pink-500" size={28} />
            <h3 className="mt-3 font-semibold text-gray-800">Email</h3>
            <p className="text-gray-600 mt-1">support@nextshop.com</p>
          </div>
          <div className="p-6 bg-white rounded-2xl shadow hover:shadow-md transition">
            <Phone className="mx-auto text-pink-500" size={28} />
            <h3 className="mt-3 font-semibold text-gray-800">Phone</h3>
            <p className="text-gray-600 mt-1">+1 (555) 123-4567</p>
          </div>
          <div className="p-6 bg-white rounded-2xl shadow hover:shadow-md transition">
            <MapPin className="mx-auto text-pink-500" size={28} />
            <h3 className="mt-3 font-semibold text-gray-800">Location</h3>
            <p className="text-gray-600 mt-1">123 Market Street, San Francisco, CA</p>
          </div>
        </div>

        {/* Contact Form */}
        <div className="mt-16 bg-white rounded-2xl shadow-lg p-8 md:p-12 max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
            Send us a Message
          </h2>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Name
              </label>
              <input
                type="text"
                name="name"
                id="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="mt-1 w-full rounded-xl border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-pink-400 focus:border-pink-400 outline-none transition"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="mt-1 w-full rounded-xl border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-pink-400 focus:border-pink-400 outline-none transition"
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                Message
              </label>
              <textarea
                name="message"
                id="message"
                rows={5}
                value={formData.message}
                onChange={handleChange}
                required
                className="mt-1 w-full rounded-xl border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-pink-400 focus:border-pink-400 outline-none transition"
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full flex justify-center items-center gap-2 bg-gradient-to-r from-yellow-400 via-orange-400 to-pink-500 text-white font-semibold py-3 rounded-xl shadow-md hover:shadow-lg transition"
            >
              <Send size={18} />
              Send Message
            </button>

            {status && <p className="text-green-600 text-center mt-3">{status}</p>}
          </form>
        </div>
      </div>
    </div>
  )
}
