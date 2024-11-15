import { tokenInstance } from "@/api/instance"
import { successReturnType, errorReturnType } from "@/types/common/apiReturnTypes"

type responseType = {
	status: number
	data: string
}

export const postStudentTokenUpdateAPI = async () => {
	try {
		const response: responseType = await tokenInstance.post("/token")

		return response.data
	} catch (error) {
		throw error
	}
}
