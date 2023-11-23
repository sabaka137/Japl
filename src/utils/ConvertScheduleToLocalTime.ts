import { UserSchedule } from '../types/User/UserTypes'

export const ConvertScheduleToLocalTime = (
    schedule: UserSchedule[],
    dateInfo?: { dayName: string; time: string }
) => {
    let gmt = new Date().getTimezoneOffset() / 60
    const date = new Date()
    console.log(dateInfo)
    let res: any[] = []
    for (let i = date.getDay() - 1; i <= 6; i++) {
        let timeArr: any[] = []
        schedule[i]?.time.forEach((time: any) => {
            timeArr.push({
                time: new Date(
                    1,
                    1,
                    1,
                    Number(time.time.split(':')[0]) + gmt,
                    time.time.split(':')[1]
                )
                    .toLocaleTimeString()
                    .split(':')
                    .slice(0, -1)
                    .join(':'),
                isAvailable: time.isAvailable,
                choosen:
                    schedule[i].name.short === dateInfo?.dayName
                        ? new Date(
                              1,
                              1,
                              1,
                              Number(time.time.split(':')[0]) + gmt,
                              time.time.split(':')[1]
                          )
                              .toLocaleTimeString()
                              .split(':')
                              .slice(0, -1)
                              .join(':') === dateInfo?.time
                            ? true
                            : false
                        : false,
            })
        })

        res.push({ ...schedule[i], time: timeArr })
    }
    for (let i = 0; i <= date.getDay() - 2; i++) {
        let timeArr: any[] = []
        schedule[i].time.forEach((time: any) => {
            timeArr.push({
                time: new Date(
                    1,
                    1,
                    1,
                    Number(time.time.split(':')[0]) + gmt,
                    time.time.split(':')[1]
                )
                    .toLocaleTimeString()
                    .split(':')
                    .slice(0, -1)
                    .join(':'),
                isAvailable: time.isAvailable,
                choosen:
                    schedule[i].name.short === dateInfo?.dayName
                        ? new Date(
                              1,
                              1,
                              1,
                              Number(time.time.split(':')[0]) + gmt,
                              time.time.split(':')[1]
                          )
                              .toLocaleTimeString()
                              .split(':')
                              .slice(0, -1)
                              .join(':') === dateInfo?.time
                            ? true
                            : false
                        : false,
            })
        })
        res.push({ ...schedule[i], time: timeArr })
    }

    return res
}
