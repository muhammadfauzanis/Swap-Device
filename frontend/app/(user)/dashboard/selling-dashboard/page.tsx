// const SellingDashboard = () => {
//   return  <div className="w-full h-screen">
//   <div className="mt-16 lg:mt-32 grid grid-rows-2 grid-cols-1 items-center lg:items-start md:grid-rows-2 md:grid-cols-1 lg:grid-rows-1 lg:grid-cols-3 justify-self-center gap-x-5 xl:gap-x-10 w-[90%] xl:w-[80%]">
//     {userData && (
//       <SideBarUser name={userData.name} email={userData.email} />
//     )}

//     <Card className="lg:col-span-2 p-4">
//       <CardContent>
//         <h3 className="text-2xl font-bold">Informasi Akun</h3>
//         <hr className="pb-10 mt-4" />

//         <div className="flex flex-col md:flex-row items-center justify-center gap-x-10 p-2">
//           <div className="bg-gray-200 p-8 rounded-full w-fit m-auto">
//             <FaUser className="text-[80px] md:text-[120px] xl:text-[160px]" />
//           </div>

//           <div className="w-[80%] md:w-[70%] m-auto">
//             <div className="space-y-2 pb-2">
//               <Label className="px-1">Email</Label>
//               <Input
//                 defaultValue={userData?.email}
//                 readOnly
//                 className="bg-gray-200"
//               />
//             </div>

//             <Form {...form}>
//               <form onSubmit={onSubmit} className="space-y-2">
//                 <FormField
//                   control={control}
//                   name="name"
//                   render={({ field }) => (
//                     <FormItem>
//                       <FormLabel className="px-1">Nama</FormLabel>
//                       <FormControl>
//                         <Input
//                           {...field}
//                           value={field.value ?? userData?.name ?? ''}
//                         />
//                       </FormControl>
//                       <FormMessage className="px-1" />
//                     </FormItem>
//                   )}
//                 />
//                 <FormField
//                   control={control}
//                   name="phoneNumber"
//                   render={({ field }) => (
//                     <FormItem>
//                       <FormLabel className="px-1">Nomor Telepon</FormLabel>
//                       <FormControl>
//                         <Input
//                           {...field}
//                           value={
//                             field.value ?? userData?.phone_number ?? ''
//                           }
//                         />
//                       </FormControl>
//                       <FormMessage className="px-1" />
//                     </FormItem>
//                   )}
//                 />
//                 <div className="pt-4">
//                   <Button
//                     className="w-full"
//                     type="submit"
//                     disabled={isDisabled || isLoading}
//                   >
//                     Update Profile
//                   </Button>
//                 </div>
//               </form>
//             </Form>
//           </div>
//         </div>
//       </CardContent>
//     </Card>
//   </div>

//   <Footer />
// </div>
// };

// export default SellingDashboard;
