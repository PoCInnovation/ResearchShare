const ResearchShare = artifacts.require("ResearchShare")

contract("Paper", (accounts) => {
    let instance = {};
    before(async () => {
        instance = await ResearchShare.deployed();
        await instance.registerUser("John", "Doe", ["spy", "murder", "poison"])
    });
    it('User creation', async () => {
        let user = await instance.getUser()
        assert.equal(user.firstname, "John", "Invalid user firstname")
        assert.equal(user.lastname, "Doe", "Invalid user lastname")
        assert.equal(user.fields.length, 3, "Found unexpected field(s)")
    });
})