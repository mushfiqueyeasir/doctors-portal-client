module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      backgroundImage: theme => ({
        'homeBG': "url('/src/assets/images/bg.png')",
        'appointmentBG': "url('/src/assets/images/appointment.png')",
        'footerBG': "url('/src/assets/images/footer.png')"
      })

    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        doctorTheme: {
          primary: "#0FCFEC",
          secondary: "#19D3AE",
          accent: "#3A4256",
          neutral: "#19D3AE",
          "base-100": "#FFFFFF",
        },
      },
      "cupcake",
    ],
  },
}
