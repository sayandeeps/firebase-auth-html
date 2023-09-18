async function updatedocument() {
                            var ref = doc(db, "userlist", user.uid)
                            await updateDoc(
                                ref, {

                                userdisplayname: userDisplayNameInput.value,
                                userphotourl: userPhotoURLInput.value,
                                useremail: userEmailInput.value,
                                userphone: userPhoneInput.value,
                                usergender: userGenderInput.value,
                                useraddress: userAddressInput.value,
                                userorganization: userOrganizationInput.value,
                                userdesignation: userDesignationInput.value
                            }
                            )
                                .then(() => {
                                    alert("updated successfully")
                                }).catch((error) => {
                                    alert("something went wrong " + error)
                                })
                        }
                        updatedocument()