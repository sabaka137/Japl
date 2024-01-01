import API from '..'
import {
    CollectionTermin,
    ICollection,
} from '../../types/Collections/CollectionType'

export const CollectionAPI = {
    GetCollections() {
        return API.get('groups/getGroups')
    },
    GetCollection(id: string) {
        return API.get(`groups/getGroup?id=${id}`)
    },
    GetCollectionNames() {
        return API.get(`groups/getGroupNames`)
    },
    CreateCollection(data: ICollection) {
        return API.post(`groups/createGroup`, data)
    },
    AddToCollection(data: { kanji: CollectionTermin; name: string }) {
        return API.post(`groups/addToGroup?name=${data.name}`, data.kanji)
    },
    DeleteCollection(id: number) {
        return API.delete(`groups/deleteGroup?id=${id}`)
    },
    UpdateCollection(data: { id: string; group: ICollection }) {
        return API.post(`groups/updateGroup?id=${data.id}`, data.group)
    },
}
