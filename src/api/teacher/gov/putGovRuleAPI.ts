import { tokenInstance } from "@/api/instance"
import { successReturnType } from "@/types/common/apiReturnTypes"

type paramsType = {
    idx: number;
    body: {
        title: string,
        detail: string,
        answer: boolean
    }
}

type responseType = {
    status: number
    data: successReturnType
}

export const putGovRuleAPI = async ({idx, body}: paramsType) => {
    try {
        const response: responseType = await tokenInstance.put(`/rule/teacher/${idx}`, body)
        return response.data
    } catch (error) {
        throw error
    }
}

