import { useForm,useFieldArray,FieldErrors } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import {useEffect } from 'react'

// type FormEvent=React.FormEvent<HTMLFormElement>;
type FormValues = {
	username: string;
	email: string;
	channel: string;
    social:{
        twitter:string,
        facebook:string,
    }
    phoneNumbers:string[],
    phNumbers:{phone:string}[],
    age:number,
    birth:Date
};
function SimpleForm() {
	const {
		register,
		control,
		handleSubmit,
		formState: { errors,touchedFields,dirtyFields,isDirty,isValid,isSubmitting,isSubmitted,isSubmitSuccessful,submitCount},
        watch,
        getValues,setValue,reset,trigger
        
	} = useForm<FormValues>({
		
        defaultValues:{
            username:'',
            email:'',
            channel:'',
            phNumbers:[{phone:''}]

        },
        // mode:'all'
       
        // defaultValues:async ()=>{
        //     const response=await fetch('https://defaultValues: { username: "Pradeep", email: "", channel: "" },jsonplaceholder.typicode.com/users/1')
        //     const data= await response.json();
        //     return({
        //        username:'Pradeep',
        //        email:data.email,
        //        channel:''

        //     })
        // }
	});

    useEffect(()=>{
        console.log('hello')
        reset()
    },[isSubmitSuccessful])

    const{fields, append, remove}=useFieldArray({
        control:control,
        name:'phNumbers'
    })

	const onSubmit = (data: FormValues) => {
		console.log(data);
        console.log(isDirty,'....',isValid)
       
	};
    const onError=(error:FieldErrors)=>{
        console.log('errror is',error)
        console.log(isDirty,'....',isValid)

    }
    // console.log({touchedFields,dirtyFields})
    // const watchUsername=watch(['username','age'])
    // const watchUsername=watch()
    // console.log(watch('birth'))
    // console.log(!watch('email'))
    // console.log({isSubmitting,isSubmitted,isSubmitSuccessful,submitCount})
	return (
		<>
        {/* <h1>{JSON.stringify(watchUsername)}</h1> */}
			<form onSubmit={handleSubmit(onSubmit,onError)} noValidate>
				<div className="form-control">
					<label htmlFor="username">Username</label>
					<input
						type="text"
						id="username"
						{...register("username", {
							required: {
								value: true,
								message: "Username is requird",
							},
						})}
					/>
					<p>{errors.username?.message}</p>
				</div>

				<div className="form-control">
					<label htmlFor="email"  >Email</label>
					<input
						type="email"
						id="email"
						{...register("email", {
							pattern: {
								value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/,
								message: "Invalid email format",
							},
							required: {
								value: true,
								message: "Email is required",
							},
							validate: (fieldValue) => {
								return (
									fieldValue !== "merodomain@gmail.com" ||
									"merodomain@gmail.com is not accepted"
								);
							},
							// validate:{
							//     notDomain:fieldValue=>fieldValue!=="merodomain@gmail.com" || 'merodomain@gmail.com is not accepted',

							//     notBlackListed:fieldValue=>!fieldValue.endsWith('baddomain.com')||'This domain is not supported'

							// }
						})}
					/>
					<p>{errors.email?.message}</p>
				</div>
                
                <div className='add-container'>
                     <p>Add Phone</p>
                <button className="add" type='button' onClick={()=>{append({phone:''})}}>+</button>
                
                </div>
               {fields.map((field,index)=>{
                    return(
                        <div className="form-control" key={field.id}>
                            
                            <input type="text" {...register(`phNumbers.${index}.phone`)} />
                            {index>0 && <button className='remove' type='button' onClick={()=>{remove(index)}}>Remove</button>}
                        </div>

                    )
                })}
                

				{/* <div className="form-control">
					<label htmlFor="channel">Channel</label>
					<input
						type="text"
						id="channel"
						{...register("channel", {
							required: {
								value: true,
								message: "Channel is required",
							},
						})}
					/>
					<p>{errors.channel?.message}</p>
				</div>


                <div className="form-control">
					<label htmlFor="facebook">Facebook</label>
					<input
						type="text"
						id="facebook"
						{...register("social.facebook", {
							required: {
								value: true,
								message: "Facebook is required",
							},
						})}
					/>
					<p>{errors.social?.facebook?.message}</p>
				</div>


                <div className="form-control">
					<label htmlFor="twitter">Twitter</label>
					<input
						type="text"
						id="twitter"
						{...register("social.twitter", {
							required: {
								value: true,
								message: "Twitter is required",
							},
						})}
					/>
					<p>{errors.social?.twitter?.message}</p>
				</div>

                
                <div className="form-control">
					<label htmlFor="primaryPhone">Primary Phone</label>
					<input
						type="text"
						id="primaryPhone"
						{...register("phoneNumbers.0", {
							required: {
								value: true,
								message: "Primary Phone is required",
							},
						})}
					/>
					<p>{errors.phoneNumbers?.[0]?.message}</p>
				</div>


                <div className="form-control">
					<label htmlFor="secondaryPhone">Secondary Phone</label>
					<input
						type="text"
						id="secondaryPhone"
						{...register("phoneNumbers.1", {
							required: {
								value: true,
								message: "Secondary Phone is required",
							},
						})}
					/>
					<p>{errors.phoneNumbers?.[1]?.message}</p>
				</div> */}

<div className="form-control">
					<label htmlFor="age">Age</label>
					<input 
						type="number"
						id="age"
						{...register("age", {
                            // disabled:!watch('birth') ,
                            valueAsNumber:true,
							required: {
								value: true,
								message: "Age is required",
							},
						})}
					/>
					<p>{errors.age?.message}</p>
				</div> 


                <div className="form-control">
					<label htmlFor="birth">Birth</label>
					<input
						type="date"
						id="birth"
						{...register("birth", {
                            valueAsDate:true,
							required: {
								value: true,
								message: "Date is required",
							},
						})}
					/>
					<p>{errors.birth?.message}</p>
				</div> 
                    
                    <button type="button" onClick={()=>{console.log(getValues(['username','age']));console.log(isDirty,'....',isValid);trigger('email')}}>Get Values</button>

                    <button type="button" onClick={()=>{setValue('username','',{
                        shouldValidate:true,
                        shouldDirty:true,
                        shouldTouch:true
                    })}}>Set value</button>
				<button type="submit"  >Submit</button>
			</form>
			<DevTool control={control}></DevTool>
		</>
	);
}

export default SimpleForm;
