import { useState } from "react";

import VoiceStats from "../components/voice/VoiceStats";
import VoiceFilters from "../components/voice/VoiceFilters";
import VoiceGrid from "../components/voice/VoiceGrid";

import CloneVoiceModal from "../components/voice/CloneVoiceModal";
import RecordVoiceModal from "../components/voice/RecordVoiceModal";
import UploadSamplesModal from "../components/voice/UploadSamplesModal";
import DeleteVoiceModal from "../components/voice/DeleteVoiceModal";

import { useVoiceContext } from "../context/VoiceContext";

export default function Voices() {
    const {
        voices,
        loading,
        deleteVoice,
      
    } = useVoiceContext();

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [language, setLanguage] = useState("all");
  const [sort, setSort] = useState("recent");

  const [cloneOpen, setCloneOpen] = useState(false);
  const [recordOpen, setRecordOpen] = useState(false);
  const [uploadOpen, setUploadOpen] = useState(false);

  const [voiceToDelete, setVoiceToDelete] =
    useState(null);

  //----------------------------------
  // Filtering
  //----------------------------------

  const filteredVoices = voices
    .filter((voice) => {
      if (
        search &&
        !voice.name
          .toLowerCase()
          .includes(search.toLowerCase())
      )
        return false;

      if (
        filter === "mine" &&
        voice.type !== "clone"
      )
        return false;

      if (
        filter === "ai" &&
        voice.type !== "ai"
      )
        return false;

      if (
        language !== "all" &&
        voice.language !== language
      )
        return false;

      return true;
    })
    .sort((a, b) => {
      switch (sort) {
        case "name":
          return a.name.localeCompare(b.name);

        case "usage":
          return (b.plays || 0) - (a.plays || 0);

        default:
          return 0;
      }
    });

  //----------------------------------

  return (
    <div
      className="
        lg:p-4
        space-y-8
      "
    >
      <VoiceStats
        totalVoices={voices.length}
        clonedVoices={
          voices.filter(
            (v) => v.type === "clone"
          ).length
        }
        aiVoices={
          voices.filter(
            (v) => v.type === "ai"
          ).length
        }
        totalPlays={voices.reduce(
          (sum, v) => sum + (v.plays || 0),
          0
        )}
      />

      <VoiceFilters
        search={search}
        onSearch={setSearch}
        filter={filter}
        onFilterChange={setFilter}
        language={language}
        onLanguageChange={setLanguage}
        sort={sort}
        onSortChange={setSort}
        total={filteredVoices.length}
      />

      <VoiceGrid
        voices={filteredVoices}
        loading={loading}
        onClone={() => setCloneOpen(true)}
        onDelete={(voice) =>
          setVoiceToDelete(voice)
        }
      />

      {/* Modals */}

      <CloneVoiceModal
        open={cloneOpen}
        onClose={() => setCloneOpen(false)}
        onRecord={() => {
          setCloneOpen(false);
          setRecordOpen(true);
        }}
        onUpload={() => {
          setCloneOpen(false);
          setUploadOpen(true);
        }}
      />

      <RecordVoiceModal
        open={recordOpen}
        onClose={() => setRecordOpen(false)}
      />

      <UploadSamplesModal
        open={uploadOpen}
        onClose={() => setUploadOpen(false)}
      />

      <DeleteVoiceModal
        open={!!voiceToDelete}
        voice={voiceToDelete}
        onClose={() =>
          setVoiceToDelete(null)
        }
        onDelete={() => {
          deleteVoice(voiceToDelete.id);
          setVoiceToDelete(null);
        }}
      />
    </div>
  );
}