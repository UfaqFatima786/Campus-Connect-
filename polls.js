async function loadPolls() {
    const pollsContainer =
        document.getElementById("pollsContainer");
    if (!pollsContainer) return;
    pollsContainer.innerHTML = `
        <div class="loading">
            Loading polls...
        </div>
    `;
    const {
        data: polls,
        error: pollsError
    } = await supabaseClient
        .from("polls")
        .select("*")
        .order("created_at", {
            ascending: false
        });
    if (pollsError) {
        console.error(
            "Polls Error:",
            pollsError
        );
        pollsContainer.innerHTML = `
            <div class="empty-state">
              <h3>
                    Unable to load polls
                </h3>
                <p>
                    Please try again later.
                </p>
            </div>
        `;
        return;
    }
    if (!polls || polls.length === 0) {
        pollsContainer.innerHTML = `
            <div class="empty-state">
                <h3>
                    No Polls Yet
                </h3>
                <p>
                    Be the first to create a campus poll.
                </p>
            </div>
        `;
        return;
    }
    const pollCards = await Promise.all(
        polls.map(async (poll) => {
            const {
                data: options,
                error: optionsError
            } = await supabaseClient
                .from("poll_options")
                .select("*")
                .eq("poll_id", poll.id);
            if (optionsError) {
                console.error(
                    "Options Error:",
                    optionsError
                );
                return "";
            }
            const {
                data: votes,
                error: votesError
            } = await supabaseClient
                .from("poll_votes")
                .select("option_id")
                .eq("poll_id", poll.id);


            if (votesError) {

                console.error(
                    "Votes Error:",
                    votesError
                );

            }
            const totalVotes =
                votes ? votes.length : 0;
            const optionsHTML =
                options && options.length
                    ? options.map(option => {
                        const optionVotes =
                            votes
                                ? votes.filter(
                                    vote =>
                                        vote.option_id === option.id
                                ).length
                                : 0;
                        const percentage =
                            totalVotes > 0
                                ? Math.round(
                                    (
                                        optionVotes /
                                        totalVotes
                                    ) * 100
                                )
                                : 0;
                        return `
                            <button
                                type="button"
                                class="poll-option"
                                data-poll-id="${poll.id}"
                                data-option-id="${option.id}"
                            >
                                <div class="poll-option-top">
                                   <span>
                                        ${option.option_text}
                                    </span>
                                    <span>
                                        ${percentage}%
                                    </span>
                                </div>
                                <div class="poll-progress">
                                    <div
                                        class="poll-progress-bar"
                                        style="width: ${percentage}%"
                                    ></div>
                                </div>
                            </button>
                        `;

                    }).join("")

                    : `
                        <p class="no-options">
                            No options available.
                        </p>
                    `;
            return `
                <article
                    class="poll-card"
                    data-poll-id="${poll.id}"
                >
                    <span class="poll-label">
                        CAMPUS POLL
                    </span>
                    <h3>
                        ${poll.question}
                    </h3>
                    <div class="poll-options">
                        ${optionsHTML}
                    </div>
                    <div class="poll-footer">
                        <span>
                            ${totalVotes}
                            vote${totalVotes === 1 ? "" : "s"}
                        </span>
                        ${poll.expires_at
                    ? `
                                    <span>
                                        Expires:
                                        ${new Date(
                        poll.expires_at
                    ).toLocaleDateString()}
                                    </span>
                                `
                    : ""
                }
                    </div>
                </article>
            `;

        })
    );
    pollsContainer.innerHTML =
        pollCards.join("");
}

document.addEventListener(
    "click",
    async function (e) {
        const optionButton =
            e.target.closest(".poll-option");

        if (!optionButton) return;
        const pollId =
            optionButton.dataset.pollId;
        const optionId =
            optionButton.dataset.optionId;
        if (!pollId || !optionId) {
            console.error(
                "Poll ID or Option ID missing."
            );

            return;
        }
        const {
            data: { user },
            error: userError
        } = await supabaseClient.auth.getUser();
        if (userError || !user) {
            alert(
                "Please login to vote."
            );

            return;
        }
        optionButton.disabled = true;
        const {
            error: voteError
        } = await supabaseClient
            .from("poll_votes")
            .insert({
                poll_id: pollId,
                option_id: optionId,
                user_id: user.id
            });

        if (voteError) {
            console.error(
                "Vote Error:",
                voteError
            );
            optionButton.disabled = false;
            if (voteError.code === "23505") {
                alert(
                    "You have already voted in this poll."
                );

            }
            else {
                alert(
                    "Unable to submit your vote."
                );

            }
            return;
        }
        alert(
            "Your vote has been recorded! 🎉"
        );
        loadPolls();

    }
);
loadPolls();

const createPollBtn =
    document.getElementById("createPollBtn");

const pollModal =
    document.getElementById("pollModal");

const closePollModal =
    document.getElementById("closePollModal");

const createPollForm =
    document.getElementById("createPollForm");
if (createPollBtn) {
    createPollBtn.addEventListener(
        "click",
        function () {
            pollModal.classList.add("show");
        }
    );

}

if (closePollModal) {
    closePollModal.addEventListener(
        "click",
        function () {
            pollModal.classList.remove("show");

        }
    );
}

if (pollModal) {
    pollModal.addEventListener(
        "click",
        function (e) {
            if (e.target === pollModal) {
                pollModal.classList.remove("show");

            }

        }
    );

}

if (createPollForm) {
    createPollForm.addEventListener(
        "submit",
        async function (e) {
            e.preventDefault();
            const question =
                document
                    .getElementById("pollQuestion")
                    .value
                    .trim();
            const option1 =
                document
                    .getElementById("pollOption1")
                    .value
                    .trim();
            const option2 =
                document
                    .getElementById("pollOption2")
                    .value
                    .trim();
            const option3 =
                document
                    .getElementById("pollOption3")
                    .value
                    .trim();
            const option4 =
                document
                    .getElementById("pollOption4")
                    .value
                    .trim();
            const expiry =
                document
                    .getElementById("pollExpiry")
                    .value;
            const options = [
                option1,
                option2,
                option3,
                option4
            ].filter(Boolean);
            if (options.length < 2) {
                alert(
                    "Please provide at least 2 options."
                );
                return;
            }
            const {
                data: poll,
                error: pollError
            } = await supabaseClient
                .from("polls")
                .insert({
                    question: question,
                    expires_at:
                        expiry
                            ? new Date(expiry).toISOString()
                            : null

                })
                .select()
                .single();
            if (pollError) {
                console.error(
                    "Create Poll Error:",
                    pollError
                );
                alert(
                    "Unable to create poll: " +
                    pollError.message
                );
                return;
            }
            const optionsData =
                options.map(option => ({
                    poll_id: poll.id,
                    option_text: option

                }));
            const {
                error: optionsError
            } = await supabaseClient
                .from("poll_options")
                .insert(optionsData);

            if (optionsError) {
                console.error(
                    "Create Poll Options Error:",
                    optionsError
                );
                alert(
                    "Poll created but options could not be added."
                );

                return;
            }
            alert(
                "Poll created successfully! 🎉"
            );
            createPollForm.reset();
            pollModal.classList.remove(
                "show"
            );
            loadPolls();
        }
    );

}