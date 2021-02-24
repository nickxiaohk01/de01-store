import axios from 'axios'

export default function (config) {
  const axiosFakePartnerServerProxy = axios.create({
    baseURL: config.FAKE_PARTNER_SERVER_FE.PROXY_URL,
    timeout: config.FAKE_PARTNER_SERVER_FE.TIMEOUT,
  })
  return {
    async submitPayment_V23(data) {
      try {
        return axiosFakePartnerServerProxy({
          url: `/api/2.3/pay`,
          method: 'POST',
          data,
        })
      } catch (e) {
        console.log(e)
      }
    },
  }
}
