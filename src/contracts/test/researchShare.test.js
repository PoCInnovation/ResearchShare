const ResearchShare = artifacts.require("ResearchShare")

contract("ResearchShare", (accounts) => {
    let instance = {};
    before(async () => {
        instance = await ResearchShare.deployed();
        await instance.registerUser("John", "Doe", ["spy", "murder", "poison"])
    });
    it('User creation', async () => {
        let user = await instance.getUser()
        console.log("fields :")
        console.log(user.fields)
        assert.equal(user.firstname, "John", "Invalid user firstname")
        assert.equal(user.lastname, "Doe", "Invalid user lastname")
        assert.equal(user.fields.length, 3, "Found unexpected field(s)")
    });
})