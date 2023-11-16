import React, { useState } from "react";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import { Flex } from "../../../../components/Common";
import Select from "react-select";
import { BsPlusLg } from "react-icons/bs";
import { AiOutlineDelete } from "react-icons/ai";
import { RegistrationSelect } from "../../../../components/Select/RegistrationSelect";
import { SelectRangeWrapper } from "../../style";
function Day({ index, control, register, name }) {
	const { fields, remove, append } = useFieldArray({
		control,
		name: `general.schedule[${index}].time`,
	});
	const [time, setTime] = useState([
		{ value: "00:00", label: "00:00" },
		{ value: "00:30", label: "00:30" },
		{ value: "01:00", label: "01:00" },
		{ value: "01:30", label: "01:30" },
		{ value: "02:00", label: "02:00" },
		{ value: "02:30", label: "02:30" },
		{ value: "03:00", label: "03:00" },
		{ value: "03:30", label: "03:30" },
		{ value: "04:00", label: "04:00" },
		{ value: "04:30", label: "04:30" },
		{ value: "05:00", label: "05:00" },
		{ value: "05:30", label: "05:30" },
		{ value: "06:00", label: "06:00" },
		{ value: "06:30", label: "06:30" },
		{ value: "07:00", label: "07:00" },
		{ value: "07:30", label: "07:30" },
		{ value: "08:00", label: "08:00" },
		{ value: "08:30", label: "08:30" },
		{ value: "09:00", label: "09:00" },
		{ value: "09:30", label: "09:30" },
		{ value: "10:00", label: "10:00" },
		{ value: "10:30", label: "10:30" },
		{ value: "11:00", label: "11:00" },
		{ value: "11:30", label: "11:30" },
		{ value: "12:00", label: "12:00" },
		{ value: "12:30", label: "12:30" },
		{ value: "13:00", label: "13:00" },
		{ value: "13:30", label: "13:30" },
		{ value: "14:00", label: "14:00" },
		{ value: "14:30", label: "14:30" },
		{ value: "15:00", label: "15:00" },
		{ value: "15:30", label: "15:30" },
		{ value: "16:00", label: "16:00" },
		{ value: "16:30", label: "16:30" },
		{ value: "17:00", label: "17:00" },
		{ value: "17:30", label: "17:30" },
		{ value: "18:00", label: "18:00" },
		{ value: "18:30", label: "18:30" },
		{ value: "19:00", label: "19:00" },
		{ value: "19:30", label: "19:30" },
		{ value: "20:00", label: "20:00" },
		{ value: "20:30", label: "20:30" },
		{ value: "21:00", label: "21:00" },
		{ value: "21:30", label: "21:30" },
		{ value: "22:00", label: "22:00" },
		{ value: "22:30", label: "22:30" },
		{ value: "23:00", label: "23:00" },
		{ value: "23:30", label: "23:30" },
	]);
	return (
		<div>
			{fields.map((item, k) => {
				return (
					<div key={item.id}>
						<div>
							<SelectRangeWrapper
							>
								<div style={{minWidth:'40%'}}>
									<RegistrationSelect isRange={true} control={control} options={time} formName={`general.schedule.${index}.time.${k}.from`}
									/>

								</div>

								<span 
								//fix-inline
								style={{ color: "#6F757B", fontFamily: "Inter", fontSize: "0.9rem" }}>
									до
								</span>
								<div //fix-inline
								 style={{minWidth:'40%' }}>
									<RegistrationSelect isRange={true} control={control} options={time} formName={`general.schedule.${index}.time.${k}.to`}
									/>
									
								</div>
								{k >= 1 ? (
									<Flex>
										<div
										style={{marginRight:'10px'}}
											onClick={() =>
												remove(k)
											}
										>
											<AiOutlineDelete fontSize={"1.2rem"} color="#8a959e" />
										</div>
										<div
											onClick={() =>
												append({
													from: "",
													to: "",
												})
											}
										>
											<BsPlusLg fontSize={"1.2rem"} color="#8a959e" />
										</div>
									</Flex>
								) : (
									<div
										onClick={() =>
											append({
												from: "",
												to: "",
											})
										}
									>
										<BsPlusLg fontSize={"1.2rem"} color="#8a959e" />
									</div>
								)}
							</SelectRangeWrapper>
						</div>
					</div>
				);
			})}
		</div>
	);
}

export default Day;
