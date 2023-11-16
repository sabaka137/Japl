import API from "..";

export const TeachersAPI = {
	GetTeachers() {
		return API.get("users/getTeachers?countries=AX,RU,4&&language=null&&min=1&&max=22&&search=Станислав&&sort=desc&&native=true&&time=12:30,13:00,14&&days=Mon");
	},
	GetTeacher(id: string) {
		return API.get(`users/getTeacher?id=${id}`);
	},
	GetLessons() {
		return API.get("users/getLessons");
	},

	RefreshData() {
		return API.get("users/refreshData");
	},
};
